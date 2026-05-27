import { Pool, QueryResultRow } from "pg"

let pool: Pool | null = null

export function getDb() {
  const neonUrl = process.env.NEON_URL

  if (!neonUrl) {
    throw new Error("NEON_URL não configurada")
  }

  if (!pool) {
    pool = new Pool({
      connectionString: neonUrl,
    })
  }

  return pool
}

export async function query<T extends QueryResultRow = any>(
  text: string,
  values?: any[]
): Promise<T[]> {
  const db = getDb()
  const result = await db.query<T>(text, values)
  return result.rows
}

export async function queryOne<T extends QueryResultRow = any>(
  text: string,
  values?: any[]
): Promise<T | null> {
  const db = getDb()
  const result = await db.query<T>(text, values)
  return result.rows[0] ?? null
}

export async function execute(text: string, values?: any[]): Promise<number> {
  const db = getDb()
  const result = await db.query(text, values)
  return result.rowCount ?? 0
}

export async function upsert(
  table: string,
  data: Record<string, any>,
  conflictColumn: string
): Promise<void> {
  const columns = Object.keys(data)
  const values = Object.values(data)
  const placeholders = columns.map((_, i) => `$${i + 1}`).join(", ")
  const updateSet = columns.map((col, i) => `${col} = $${i + 1}`).join(", ")

  const query = `
    INSERT INTO ${table} (${columns.join(", ")})
    VALUES (${placeholders})
    ON CONFLICT (${conflictColumn})
    DO UPDATE SET ${updateSet}
  `

  await execute(query, values)
}
