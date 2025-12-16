/**
 * Run database migrations
 */
import { neon } from '@neondatabase/serverless'
import { readFileSync } from 'fs'

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL not found in environment')
  process.exit(1)
}

const sql = neon(DATABASE_URL)

// Read migration file
const migration = readFileSync('./migrations/001_add_confirmation_tables.sql', 'utf-8')

console.log('🚀 Running migration: 001_add_confirmation_tables.sql\n')

try {
  // Parse SQL statements properly
  const statements = []
  let currentStatement = ''
  let inFunction = false

  for (const line of migration.split('\n')) {
    const trimmed = line.trim()

    // Skip comments and empty lines
    if (trimmed.startsWith('--') || trimmed.length === 0) {
      continue
    }

    // Track if we're inside a function definition
    if (trimmed.includes('$$')) {
      inFunction = !inFunction
    }

    currentStatement += line + '\n'

    // Only split on semicolon if not inside a function
    if (trimmed.endsWith(';') && !inFunction) {
      statements.push(currentStatement.trim())
      currentStatement = ''
    }
  }

  // Add final statement if exists
  if (currentStatement.trim().length > 0) {
    statements.push(currentStatement.trim())
  }

  console.log(`Executing ${statements.length} statements...\n`)

  for (const [index, statement] of statements.entries()) {
    if (statement.length < 10) continue

    const preview = statement.substring(0, 80).replace(/\s+/g, ' ')
    console.log(`[${index + 1}/${statements.length}] ${preview}...`)

    try {
      await sql.query(statement)
    } catch (error) {
      console.error(`\n❌ Error in statement ${index + 1}:`)
      console.error(error.message)
      console.error('\nStatement:', statement.substring(0, 200))
      throw error
    }
  }

  console.log('\n✅ Migration completed successfully!\n')

  // Verify tables were created
  console.log('Verifying tables...')
  const tables = await sql`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_name IN ('user_job_interests', 'user_preferences')
    ORDER BY table_name
  `

  console.log('✓ Tables created:')
  tables.forEach(t => console.log(`  - ${t.table_name}`))

  // Show row counts
  console.log('\nRow counts:')
  const interests = await sql`SELECT COUNT(*) as count FROM user_job_interests`
  const preferences = await sql`SELECT COUNT(*) as count FROM user_preferences`
  console.log(`  - user_job_interests: ${interests[0].count} rows`)
  console.log(`  - user_preferences: ${preferences[0].count} rows`)

  console.log('\n🎉 Ready to accept confirmations!\n')

} catch (error) {
  console.error('\n❌ Migration failed')
  process.exit(1)
}
