import { sql } from 'drizzle-orm';
import { execute } from '../lib/db';

/**
 * Fetch all locations
 * @returns The result of the query as a list of locations
 */
export const fetchAllLocations = async () => {
  return execute(sql`SELECT * FROM location`);
};

/**
 * Fetch a single location using it's given ID
 * @param id The location ID
 * @returns The data of a single location records from the database
 */
export const fetchSingleLocation = async (id: number) => {
  const result = await execute(sql`SELECT * FROM location WHERE id = ${id}`);
  return result[0];
};
