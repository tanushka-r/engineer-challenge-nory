import { sql } from 'drizzle-orm';
import { execute } from '../lib/db';

/**
 * Fetch all waste records for a given location
 * @param locationId Location ID to filter waste records
 * @returns List of waste records for the location
 */
export const fetchAllWasteForLocation = async (locationId: number) => {
  return execute(sql`
    SELECT
      waste.*,
      ingredient.name AS ingredient_name,
      location.name AS location_name
    FROM waste
    LEFT JOIN ingredient ON waste.ingredient_id = ingredient.id
    LEFT JOIN location ON waste.location_id = location.id
    WHERE waste.location_id = ${locationId}
    ORDER BY waste.created_at DESC;
  `);
};

/**
 * Fetch total cost of all waste for a given location
 * @param locationId Location ID to filter waste records
 * @returns Total cost as a number (0 if no waste records)
 */
export const fetchTotalWasteCostForLocation = async (locationId: number): Promise<number> => {
  const result = await execute(sql`
    SELECT COALESCE(SUM(cost), 0) AS total_cost
    FROM waste
    WHERE location_id = ${locationId};
  `);

  // result is array of rows, extract total_cost from first row or return 0
  return result.length > 0 ? Number(result[0].total_cost) : 0;
};

/**
 * Create a new waste record
 * @param ingredientId Ingredient ID
 * @param locationId Location ID
 * @param quantity Quantity of waste
 * @param cost Cost associated with the waste
 * @param staffId Staff ID who recorded the waste (optional)
 * @returns The newly created waste record
 */
export const createWaste = async (
  ingredientId: number,
  locationId: number,
  quantity: number,
  cost: number,
  staffId?: number
) => {
  const result = await execute(sql`
    INSERT INTO waste (ingredient_id, location_id, quantity, cost, staff_id, created_at, updated_at)
    VALUES (${ingredientId}, ${locationId}, ${quantity}, ${cost}, ${staffId}, DEFAULT, DEFAULT)
    RETURNING *;
  `);
  return result[0];
};

/**
 * Delete a waste record by ID
 * @param wasteId Waste record ID
 * @returns Execution result
 */
export const removeWaste = async (wasteId: number) => {
  return execute(sql`
    DELETE FROM waste WHERE id = ${wasteId};
  `);
};
