import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../drizzle/schema';

const pool = new Pool({
  connectionString: 'postgres://postgres:postgres@localhost:6679/weird_salads_javascript_development',
});

export const db = drizzle(pool, { schema });
