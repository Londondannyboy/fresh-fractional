/**
 * ZEP Context Templates for Fractional Quest
 *
 * Context templates provide structured memory retrieval from ZEP's knowledge graph.
 * They define what information to include in context blocks for AI conversations.
 *
 * Based on ZEP's context-templates-example:
 * https://github.com/getzep/zep/tree/main/examples/python/context-templates-example
 */

import { getZepClient } from './zep-client'

// ============================================================================
// TEMPLATE DEFINITIONS
// ============================================================================

export const TEMPLATES = {
  // Main template for job search conversations
  JOB_SEARCH_CONTEXT: 'fractional-job-search',

  // Candidate profile template
  CANDIDATE_PROFILE: 'fractional-candidate-profile',

  // Client requirements template
  CLIENT_REQUIREMENTS: 'fractional-client-requirements'
} as const

// Template content definitions
const TEMPLATE_CONTENT = {
  [TEMPLATES.JOB_SEARCH_CONTEXT]: `# CANDIDATE PROFILE
%{user_summary}

# CONFIRMED SKILLS & EXPERTISE
%{entities types=[Skill] limit=15}

# WORK EXPERIENCE
%{entities types=[Company, Organization] limit=10}
%{edges types=[WORKED_AT, HAS_EXPERIENCE] limit=10}

# JOB PREFERENCES (Confirmed by User)
%{edges types=[PREFERS, INTERESTED_IN, CONFIRMED_PREFERENCE] limit=15}

# LOCATION & AVAILABILITY
%{entities types=[Location] limit=5}
%{edges types=[LOCATED_IN, AVAILABLE_IN] limit=5}

# RECENT CONVERSATION CONTEXT
%{edges limit=10}`,

  [TEMPLATES.CANDIDATE_PROFILE]: `# ABOUT THIS CANDIDATE
%{user_summary}

# PROFESSIONAL SKILLS
%{entities types=[Skill] limit=20}

# CAREER HISTORY
%{entities types=[Company] limit=10}
%{edges types=[WORKED_AT] limit=15}

# ROLE PREFERENCES
%{edges types=[INTERESTED_IN, PREFERS] limit=10}

# CONFIRMED FACTS
%{edges types=[CONFIRMED_PREFERENCE] limit=20}`,

  [TEMPLATES.CLIENT_REQUIREMENTS]: `# CLIENT PROFILE
%{user_summary}

# REQUIRED SKILLS
%{entities types=[Skill, Requirement] limit=15}

# COMPANY CONTEXT
%{entities types=[Company, Industry] limit=5}

# HIRING REQUIREMENTS
%{edges types=[REQUIRES, MUST_HAVE] limit=15}

# CULTURE & FIT PREFERENCES
%{edges types=[VALUES, CULTURE_FIT] limit=10}`
}

// ============================================================================
// TEMPLATE MANAGEMENT
// ============================================================================

/**
 * Initialize all context templates in ZEP
 * Call this once during app startup or deployment
 */
export async function initializeZepTemplates(): Promise<{
  success: boolean
  initialized: string[]
  failed: string[]
}> {
  const client = getZepClient()
  if (!client) {
    return { success: false, initialized: [], failed: Object.keys(TEMPLATES) }
  }

  const initialized: string[] = []
  const failed: string[] = []

  for (const [key, templateId] of Object.entries(TEMPLATES)) {
    try {
      // Try to create the template
      await (client as any).context?.createContextTemplate?.({
        templateId,
        template: TEMPLATE_CONTENT[templateId]
      })
      initialized.push(templateId)
      console.log(`[ZEP Templates] Created: ${templateId}`)
    } catch (error: any) {
      // Template might already exist, which is fine
      if (error?.status === 409 || error?.message?.includes('already exists')) {
        initialized.push(templateId)
        console.log(`[ZEP Templates] Already exists: ${templateId}`)
      } else {
        failed.push(templateId)
        console.error(`[ZEP Templates] Failed to create ${templateId}:`, error)
      }
    }
  }

  return {
    success: failed.length === 0,
    initialized,
    failed
  }
}

// ============================================================================
// CONTEXT RETRIEVAL
// ============================================================================

/**
 * Get enriched context for a user using a context template
 */
export async function getEnrichedContext(
  userId: string,
  templateId: string = TEMPLATES.JOB_SEARCH_CONTEXT
): Promise<string | null> {
  const client = getZepClient()
  if (!client) {
    console.warn('[ZEP Templates] Client not available')
    return null
  }

  try {
    // Create or get a thread for this user
    const threadId = `thread-${userId}`

    // Try to get context using the template
    const userContext = await (client as any).thread?.getUserContext?.(threadId, {
      templateId
    })

    if (userContext?.context) {
      console.log(`[ZEP Templates] Retrieved context for ${userId} using ${templateId}`)
      return userContext.context
    }

    // Fallback: Try without template
    const fallbackContext = await (client as any).thread?.getUserContext?.(threadId)
    return fallbackContext?.context || null
  } catch (error) {
    console.error('[ZEP Templates] Failed to get enriched context:', error)
    return null
  }
}

/**
 * Get context for a specific user type
 */
export async function getContextForUserType(
  userId: string,
  userType: 'candidate' | 'client'
): Promise<string | null> {
  const templateId = userType === 'client'
    ? TEMPLATES.CLIENT_REQUIREMENTS
    : TEMPLATES.CANDIDATE_PROFILE

  return getEnrichedContext(userId, templateId)
}

// ============================================================================
// CONTEXT FORMATTING HELPERS
// ============================================================================

/**
 * Format context for inclusion in Hume voice agent system prompt
 */
export function formatContextForVoice(context: string | null): string {
  if (!context) {
    return ''
  }

  return `
## Previous Knowledge About This User

${context}

---
Use the above context to personalize your responses and remember what the user has told you before.
`.trim()
}

/**
 * Format context for inclusion in Pydantic AI system prompt
 */
export function formatContextForPydantic(context: string | null): string {
  if (!context) {
    return ''
  }

  return `
<user_context>
${context}
</user_context>

Use this context about the user when extracting entities and determining relevance.
`.trim()
}

// ============================================================================
// THREAD MANAGEMENT
// ============================================================================

/**
 * Ensure a thread exists for a user
 */
export async function ensureThread(userId: string): Promise<string | null> {
  const client = getZepClient()
  if (!client) return null

  const threadId = `thread-${userId}`

  try {
    // Try to get existing thread
    await (client as any).thread?.get?.(threadId)
    return threadId
  } catch {
    // Create new thread
    try {
      await (client as any).thread?.create?.({
        threadId,
        userId,
        metadata: {
          source: 'fractional-quest',
          createdAt: new Date().toISOString()
        }
      })
      console.log(`[ZEP Templates] Created thread: ${threadId}`)
      return threadId
    } catch (error) {
      console.error('[ZEP Templates] Failed to create thread:', error)
      return null
    }
  }
}

/**
 * Add a message to a user's thread
 */
export async function addMessageToThread(
  userId: string,
  role: 'user' | 'assistant',
  content: string
): Promise<boolean> {
  const client = getZepClient()
  if (!client) return false

  const threadId = await ensureThread(userId)
  if (!threadId) return false

  try {
    await (client as any).thread?.addMessage?.(threadId, {
      role,
      content,
      metadata: {
        timestamp: new Date().toISOString()
      }
    })
    return true
  } catch (error) {
    console.error('[ZEP Templates] Failed to add message:', error)
    return false
  }
}
