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
# Use GOOGLE_GENERATIVE_AI_API_KEY or fall back to GOOGLE_API_KEY
api_key = os.environ.get('GOOGLE_GENERATIVE_AI_API_KEY') or os.environ.get('GOOGLE_API_KEY')
model = GeminiModel('gemini-1.5-flash', api_key=api_key)
agent = Agent(
    model=model,
    result_type=JobSearchIntent,
    system_prompt="""You are an intent extraction system for a fractional executive job platform.

CRITICAL RULE: If the user mentions a SPECIFIC role (CFO, CMO, CTO, etc.) and/or location (London, UK, etc.), it is ALWAYS search_jobs - they want to see jobs NOW!

Analyze conversation transcripts and determine user intent:

1. search_jobs: User wants to SEE jobs NOW (90% of cases)
   - "Show me...", "Find...", "What jobs..."
   - "I'm interested in [SPECIFIC ROLE] in [LOCATION]" ← THIS IS SEARCH_JOBS!
   - "I'm interested in CMO jobs" ← THIS IS SEARCH_JOBS!
   - "I'm looking for..."
   - ANY mention of specific roles or locations
   - Extract role_type (CFO, CMO, CTO, etc.) and location

2. confirm_preference: User stating GENERAL career preference (RARE - only 5%)
   - "I'm interested in [ROLE] for my career going forward"
   - ONLY if stating vague preference WITHOUT asking to see jobs
   - If in doubt, use search_jobs instead!

3. unknown: Neither

EXAMPLES:
"interested in cmo jobs in london" → search_jobs (specific role + location)
"I'm interested in CMO jobs" → search_jobs (specific role)
"Show me CFO jobs" → search_jobs (obvious)

DEFAULT TO search_jobs WHEN IN DOUBT!"""
)


# Map executive titles to role categories for better search
def map_role_to_category(role_type: Optional[str]) -> str:
    if not role_type:
        return '%'

    role_lower = role_type.lower()

    # Map C-level titles to categories
    if 'cmo' in role_lower or 'chief marketing' in role_lower:
        return '%Marketing%'
    if 'cfo' in role_lower or 'chief financial' in role_lower or 'finance director' in role_lower:
        return '%Finance%'
    if 'cto' in role_lower or 'chief technology' in role_lower or 'chief technical' in role_lower:
        return '%Technology%'
    if 'coo' in role_lower or 'chief operating' in role_lower:
        return '%Operations%'
    if 'ceo' in role_lower or 'chief executive' in role_lower:
        return '%Executive%'

    # Default: use the literal search term
    return f'%{role_type}%'


def query_jobs(role_type: Optional[str], location: Optional[str]) -> list[dict]:
    """Query Neon database for jobs"""
    try:
        conn = psycopg2.connect(os.environ.get('DATABASE_URL'))
        cursor = conn.cursor(cursor_factory=RealDictCursor)

        role_pattern = map_role_to_category(role_type)
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


def handler(request):
    """Vercel serverless function handler - simplified for compatibility"""

    # Handle OPTIONS for CORS
    if request.method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }

    try:
        # Parse request body
        body = json.loads(request.body) if hasattr(request, 'body') else json.loads(request)

        transcript = body.get('transcript', '')
        user_id = body.get('userId')

        print(f'[Pydantic AI] Analyzing: {transcript[:100]}')

        if not transcript or len(transcript) < 10:
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
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
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
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
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
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
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'status': 'no_action',
                'method': 'pydantic_ai',
                'intent': intent.model_dump()
            })
        }

    except Exception as e:
        print(f'[Pydantic AI] Error: {e}')
        import traceback
        traceback.print_exc()

        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'Pydantic AI analysis failed',
                'details': str(e)
            })
        }
