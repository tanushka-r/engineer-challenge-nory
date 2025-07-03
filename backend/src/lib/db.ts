import { drizzle } from 'drizzle-orm/node-postgres';
import { sql } from 'drizzle-orm';
import { Pool } from 'pg';
import * as schema from '../drizzle/schema';

const pool = new Pool({
  connectionString: 'postgres://postgres:postgres@localhost:6679/weird_salads_javascript_development',
});

export const db = drizzle(pool, { schema });

/**
 * Execute a parameterized query using drizzle's `sql` helper
 */
export const execute = async (
  query: ReturnType<typeof sql>
) => {
  try {
    const result = await db.execute(query);
    return result.rows;
  } catch (error) {
    console.error('[DB Error]', error);
    throw new Error('Database query failed');
  }
};
