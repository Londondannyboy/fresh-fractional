import { neon } from '@neondatabase/serverless'

// Get SQL client - DATABASE_URL required at runtime
const getSql = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required')
  }
  return neon(process.env.DATABASE_URL)
}

// Execute raw SQL query with proper template string handling
export async function dbQuery<T = unknown>(
  strings: TemplateStringsArray,
  ...values: unknown[]
): Promise<T[]> {
  const sql = getSql()
  return await sql(strings, ...values)
}

// Alternative: Pass raw SQL safely (used when query is dynamic)
export async function dbQueryDynamic<T = unknown>(
  sqlString: string,
  params?: unknown[]
): Promise<T[]> {
  const sql = getSql()
  // Use parameterized query to prevent SQL injection
  return await sql.query(sqlString, params)
}
