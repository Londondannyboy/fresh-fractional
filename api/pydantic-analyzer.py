"""
Pydantic AI Transcript Analyzer (Method C)
Python serverless function using actual Pydantic AI framework
"""

import os
import json
from typing import Optional, Literal
from pydantic import BaseModel, Field
from pydantic_ai import Agent
from pydantic_ai.models.gemini import GeminiModel
import psycopg2
from psycopg2.extras import RealDictCursor


class JobSearchIntent(BaseModel):
    """Structured intent extraction using Pydantic"""
    action: Literal['search_jobs', 'confirm_preference', 'unknown']
    role_type: Optional[str] = Field(None, description='Executive title like CFO, CMO, CTO')
    location: Optional[str] = Field(None, description='City or country like London, UK')
    preference_type: Optional[str] = Field(None, description='Type of preference being confirmed')
    values: Optional[list[str]] = Field(None, description='Values for preference')
    confidence: float = Field(description='Confidence score 0-1')
    reasoning: str = Field(description='Why this intent was detected')


# Initialize Pydantic AI Agent with Gemini
model = GeminiModel('gemini-1.5-flash', api_key=os.environ.get('GOOGLE_API_KEY'))
agent = Agent(
    model=model,
    result_type=JobSearchIntent,
    system_prompt="""You are an intent extraction system for a fractional executive job platform.

Analyze conversation transcripts and determine user intent:

1. search_jobs: User wants to SEE jobs immediately
   - "Show me...", "Find...", "What jobs..."
   - Extract role_type (CFO, CMO, CTO, etc.) and location

2. confirm_preference: User stating lasting preference (needs HITL confirmation)
   - "I'm interested in... for my career"
   - Only if clearly stating preference to save, not one-time search

3. unknown: Neither

IMPORTANT: "I'm interested in fractional jobs" → search_jobs (wants to see jobs now)

Be decisive. Prefer search_jobs over unknown."""
)


def query_jobs(role_type: Optional[str], location: Optional[str]) -> list[dict]:
    """Query Neon database for jobs"""
    try:
        conn = psycopg2.connect(os.environ.get('DATABASE_URL'))
        cursor = conn.cursor(cursor_factory=RealDictCursor)

        role_pattern = f'%{role_type}%' if role_type else '%'
        location_pattern = f'%{location}%' if location else '%'

        cursor.execute("""
            SELECT
                id, slug, title, company_name, location, is_remote,
                salary_min, salary_max, salary_currency,
                CASE
                    WHEN is_fractional = true THEN 1
                    WHEN LOWER(title) LIKE '%fractional%' THEN 2
                    WHEN LOWER(title) LIKE '%part%%time%' OR LOWER(title) LIKE '%interim%' THEN 3
                    ELSE 4
                END as priority
            FROM jobs
            WHERE is_active = true
                AND (
                    LOWER(COALESCE(executive_title::text, '')) LIKE LOWER(%s)
                    OR LOWER(COALESCE(role_category::text, '')) LIKE LOWER(%s)
                    OR LOWER(title) LIKE LOWER(%s)
                )
                AND (
                    LOWER(COALESCE(city::text, '')) LIKE LOWER(%s)
                    OR LOWER(COALESCE(country, '')) LIKE LOWER(%s)
                    OR LOWER(COALESCE(location, '')) LIKE LOWER(%s)
                )
            ORDER BY priority ASC, posted_date DESC NULLS LAST
            LIMIT 5
        """, (role_pattern, role_pattern, role_pattern, location_pattern, location_pattern, location_pattern))

        jobs = cursor.fetchall()
        cursor.close()
        conn.close()

        return [dict(job) for job in jobs]

    except Exception as e:
        print(f'[Pydantic AI] DB error: {e}')
        return []


def handler(event, context=None):
    """Vercel serverless function handler"""

    # Parse request
    try:
        body = json.loads(event.get('body', '{}')) if isinstance(event, dict) else json.loads(event)
        transcript = body.get('transcript', '')
        user_id = body.get('userId')

        print(f'[Pydantic AI] Analyzing: {transcript[:100]}')

        if not transcript or len(transcript) < 10:
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({
                    'status': 'no_action',
                    'method': 'pydantic_ai',
                    'intent': {
                        'action': 'unknown',
                        'confidence': 0,
                        'reasoning': 'Transcript too short'
                    }
                })
            }

        # Use Pydantic AI Agent for intent extraction
        result = agent.run_sync(f'Analyze this transcript: "{transcript}"')
        intent = result.data

        print(f'[Pydantic AI] Intent: {intent.model_dump()}')

        # If search_jobs, query database
        if intent.action == 'search_jobs':
            jobs = query_jobs(intent.role_type, intent.location)

            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({
                    'status': 'success',
                    'method': 'pydantic_ai',
                    'intent': intent.model_dump(),
                    'data': {
                        'type': 'job_results',
                        'source': 'pydantic_ai',
                        'jobs': [{
                            'id': str(j['id']),
                            'slug': j['slug'],
                            'title': j['title'],
                            'company': j['company_name'],
                            'location': j['location'],
                            'isRemote': j['is_remote'],
                            'dayRate': j['salary_min'],
                            'currency': j.get('salary_currency', 'GBP')
                        } for j in jobs]
                    }
                })
            }

        # If confirm_preference, return confirmation request
        elif intent.action == 'confirm_preference':
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({
                    'status': 'success',
                    'method': 'pydantic_ai',
                    'intent': intent.model_dump(),
                    'data': {
                        'type': 'confirmation',
                        'source': 'pydantic_ai',
                        'preference_type': intent.preference_type,
                        'values': intent.values
                    }
                })
            }

        # Unknown intent
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({
                'status': 'no_action',
                'method': 'pydantic_ai',
                'intent': intent.model_dump()
            })
        }

    except Exception as e:
        print(f'[Pydantic AI] Error: {e}')
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({
                'error': 'Pydantic AI analysis failed',
                'details': str(e)
            })
        }
