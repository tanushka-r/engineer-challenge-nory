import { sql } from 'drizzle-orm';
import { execute } from '../lib/db';

/**
 * Fetch all menu entries for a given location
 * @param locationId Location ID to filter menu
 * @returns List of menu records for the location, including recipe name
 */
export const fetchAllMenusForLocation = async (locationId: number) => {
  return execute(sql`
    SELECT
      menu.*,
      recipe.name AS recipe_name
    FROM menu
    LEFT JOIN recipe ON menu.recipe_id = recipe.id
    WHERE menu.location_id = ${locationId};
  `);
};
