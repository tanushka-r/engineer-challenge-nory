import { sql } from 'drizzle-orm';
import { execute } from '../lib/db';

/**
 * Fetch all staff
 * @returns The result of the query as a list of staff
 */
export const fetchAllStaff = async () => {
  return execute(sql`SELECT * FROM staff`);
};

/**
 * Fetch a single staff using it's given ID
 * @param id The staff ID
 * @returns The data of a single staff records from the database
 */
export const fetchSingleStaff = async (id: number) => {
  const result = await execute(sql`
    SELECT
      staff.*,
      role.name AS role_name
    FROM staff
    JOIN role ON staff.role_id = role.id
    WHERE staff.id = ${id}
  `);
  return result[0];
};
