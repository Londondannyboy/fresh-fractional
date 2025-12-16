/**
 * Copilot Agent API - TypeScript version for local development
 *
 * Handles intent detection and confirmation requests using Anthropic Claude
 * This is Method C - Human-in-the-loop confirmations
 */
import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!
})

const SYSTEM_PROMPT = `You are an intent detector for a voice-based job search assistant.

Your job is to detect when users want to take actions that require confirmation.

IMPORTANT RULES:
- Actions save_job, update_preference, and apply ALWAYS require confirmation
- Action "none" never requires confirmation
- Generate natural confirmation messages

1. **save_job**: User expresses interest in a specific job (ALWAYS requires confirmation)
   - "I'm interested in that CFO role"
   - "Save this job for me"
   - "I like this one"

2. **update_preference**: User states career preferences (ALWAYS requires confirmation)
   - "My day rate is £1200"
   - "I prefer remote work"
   - "I only want jobs in London"

3. **apply**: User wants to apply to a job (ALWAYS requires confirmation)
   - "I want to apply"
   - "How do I apply?"

4. **none**: No confirmation needed (just searching/exploring)
   - "Show me CFO jobs"
   - "What jobs are available?"

You MUST respond with valid JSON matching this structure:
{
  "action": "save_job" | "update_preference" | "apply" | "none",
  "job_id": string | null,
  "preference_type": string | null,
  "values": string[] | null,
  "requires_confirmation": boolean,
  "confirmation_message": string | null,
  "confidence": number
}

Examples:
- "I'm interested" → {"action": "save_job", "confidence": 0.95, "requires_confirmation": true, "confirmation_message": "Save this job?"}
- "Show me jobs" → {"action": "none", "requires_confirmation": false, "confirmation_message": null}
`

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { transcript, user_id } = body

    if (!transcript || transcript.length < 5) {
      return NextResponse.json({
        type: 'text',
        response: 'Transcript too short'
      })
    }

    console.log('[Copilot Agent] Analyzing transcript:', transcript)

    // Call Claude to analyze intent
    const message = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{
        role: 'user',
        content: `Analyze this transcript and extract the intent: "${transcript}"`
      }]
    })

    const content = message.content[0].type === 'text' ? message.content[0].text : ''

    // Extract JSON from response (Claude might wrap it)
    let jsonStr = content
    if (content.includes('```json')) {
      jsonStr = content.split('```json')[1].split('```')[0].trim()
    } else if (content.includes('```')) {
      jsonStr = content.split('```')[1].split('```')[0].trim()
    } else if (content.includes('{')) {
      const start = content.indexOf('{')
      const end = content.lastIndexOf('}') + 1
      jsonStr = content.substring(start, end)
    }

    const parsed = JSON.parse(jsonStr)

    console.log('[Copilot Agent] Detected intent:', parsed.action, 'confidence:', parsed.confidence)

    // If it requires confirmation, return confirmation request
    if (parsed.action !== 'none' && parsed.requires_confirmation) {
      return NextResponse.json({
        type: 'confirmation_required',
        action: parsed.action,
        message: parsed.confirmation_message || `Confirm ${parsed.action}?`,
        data: {
          job_id: parsed.job_id,
          title: extractJobTitle(transcript),
          company: extractCompany(transcript),
          preference_type: parsed.preference_type,
          values: parsed.values
        },
        user_id
      })
    }

    // No confirmation needed
    return NextResponse.json({
      type: 'text',
      response: 'Intent detected but no confirmation needed',
      action: parsed.action
    })

  } catch (error: any) {
    console.error('[Copilot Agent] Error:', error)
    return NextResponse.json({
      type: 'error',
      error: error.message
    }, { status: 500 })
  }
}

// Helper functions to extract data from transcript
function extractJobTitle(transcript: string): string | null {
  const lower = transcript.toLowerCase()

  // Common executive titles
  const titles = ['cfo', 'cmo', 'cto', 'ceo', 'coo', 'cpo', 'ciso']
  for (const title of titles) {
    if (lower.includes(title)) {
      return title.toUpperCase()
    }
  }

  // Look for "...director" or "...manager"
  const directorMatch = transcript.match(/([\w\s]+)\s+director/i)
  if (directorMatch) return directorMatch[0]

  const managerMatch = transcript.match(/([\w\s]+)\s+manager/i)
  if (managerMatch) return managerMatch[0]

  return null
}

function extractCompany(transcript: string): string | null {
  // Look for "at [Company]" pattern
  const atMatch = transcript.match(/\bat\s+([A-Z][\w\s]+)/i)
  if (atMatch) return atMatch[1].trim()

  return null
}
