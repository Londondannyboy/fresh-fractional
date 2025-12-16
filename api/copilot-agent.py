"""
Pydantic AI Agent with AG-UI Human-in-the-Loop Support
Handles job interest confirmations for Frac
"""
import os
import json
from http.server import BaseHTTPRequestHandler
from typing import Optional
from pydantic import BaseModel, Field
from pydantic_ai import Agent
from pydantic_ai.models.anthropic import AnthropicModel

# Environment variables
ANTHROPIC_API_KEY = os.getenv('ANTHROPIC_API_KEY')

# Define the state/context for the agent
class JobInterest(BaseModel):
    """Job that user is interested in"""
    job_id: str = Field(description="ID of the job")
    title: str = Field(description="Job title")
    company: str = Field(description="Company name")
    location: Optional[str] = Field(default=None, description="Job location")
    day_rate: Optional[int] = Field(default=None, description="Day rate in GBP")

class ConfirmationRequest(BaseModel):
    """Request for user confirmation"""
    action: str = Field(description="Action type: save_job, update_preference, apply")
    message: str = Field(description="Confirmation message for user")
    data: dict = Field(description="Data associated with the action")
    requires_approval: bool = Field(default=True)

# Create the Pydantic AI agent
agent = Agent(
    model=AnthropicModel('claude-3-5-haiku-20241022'),
    system_prompt="""You are a voice assistant for fractional executive job search.

Your role is to detect when users want to take actions that require confirmation:

1. **save_job** - User expresses interest in a specific job
2. **update_preference** - User states career preferences
3. **apply** - User wants to apply to a job

When you detect one of these intents, you must request user approval before proceeding.

Be conversational and helpful. Always confirm before taking actions."""
)

@agent.tool
async def save_job_interest(
    job_id: str,
    title: str,
    company: str,
    location: Optional[str] = None,
    day_rate: Optional[int] = None
) -> str:
    """
    Save a job that the user is interested in.
    This requires user confirmation via AG-UI.

    Args:
        job_id: Unique identifier for the job
        title: Job title (e.g., "CFO", "CMO")
        company: Company name
        location: Job location (optional)
        day_rate: Day rate in GBP (optional)

    Returns:
        Confirmation message
    """
    # This will emit an AG-UI confirmation request event
    # The frontend will catch it and show a confirmation modal

    return json.dumps({
        "type": "confirmation_required",
        "action": "save_job",
        "message": f"Save your interest in {title} at {company}?",
        "data": {
            "job_id": job_id,
            "title": title,
            "company": company,
            "location": location,
            "day_rate": day_rate
        }
    })

@agent.tool
async def update_user_preference(
    preference_type: str,
    values: list[str]
) -> str:
    """
    Update user's career preferences.
    This requires user confirmation via AG-UI.

    Args:
        preference_type: Type of preference (role, location, day_rate, work_type)
        values: List of preference values

    Returns:
        Confirmation message
    """
    return json.dumps({
        "type": "confirmation_required",
        "action": "update_preference",
        "message": f"Update your {preference_type} preferences to: {', '.join(values)}?",
        "data": {
            "preference_type": preference_type,
            "values": values
        }
    })

# Vercel serverless handler
class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        """Handle POST requests from the frontend"""

        try:
            # Read request body
            content_length = int(self.headers['Content-Length'])
            body = self.rfile.read(content_length)
            data = json.loads(body.decode('utf-8'))

            transcript = data.get('transcript', '')

            if not transcript:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "error": "Missing transcript"
                }).encode())
                return

            # Run the agent asynchronously
            import asyncio
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)

            result = loop.run_until_complete(
                agent.run(f"User said: {transcript}")
            )

            # Extract response
            response_text = result.data if hasattr(result, 'data') else str(result)

            # Check if response contains a confirmation request
            try:
                response_json = json.loads(response_text)
                if response_json.get('type') == 'confirmation_required':
                    # This is a confirmation request
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('X-CopilotKit-Event', 'confirmation')
                    self.end_headers()
                    self.wfile.write(json.dumps(response_json).encode())
                    return
            except json.JSONDecodeError:
                pass

            # Regular response
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                "response": response_text,
                "type": "text"
            }).encode())

        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                "error": str(e)
            }).encode())

    def do_OPTIONS(self):
        """Handle CORS preflight"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
