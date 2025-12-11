import { neon } from '@neondatabase/serverless'

// Get SQL client - DATABASE_URL required at runtime
const getSql = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required')
  }
  return neon(process.env.DATABASE_URL)
}

// Flexible database query helper - accepts template string or regular string
export async function dbQuery<T = unknown>(
  queryOrStrings: string | TemplateStringsArray,
  ...values: unknown[]
): Promise<T[]> {
  const sql = getSql()

  // If it's a plain string (typeof check), use it directly
  if (typeof queryOrStrings === 'string') {
    return (await sql(queryOrStrings as any)) as T[]
  }

  // Otherwise, it's a template array from tagged template literal
  return (await sql(queryOrStrings, ...values)) as T[]
}
