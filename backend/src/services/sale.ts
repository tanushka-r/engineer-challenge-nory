import { sql } from 'drizzle-orm';
import { execute } from '../lib/db';
import { SaleInsertSchema, SaleInsert } from '../models/sale';

/**
 * Fetch all sales
 * @returns The result of the query as a list of sales
 */
export const fetchAllSales = async () => {
  return execute(sql`SELECT * FROM sale`);
};

/**
 * Fetch all sales for a specific location
 * @param locationId The ID of the location
 * @returns The result of the query as a list of sales for that location
 */
export const fetchAllSalesForLocation = async (locationId: number) => {
  return execute(sql`SELECT * FROM sale WHERE location_id = ${locationId}`);
};

/**
 * Fetch a single sale using its given ID
 * @param id The sale ID
 * @returns The data of a single sale record from the database
 */
export const fetchSingleSale = async (id: number) => {
  const result = await execute(sql`SELECT * FROM sale WHERE id = ${id}`);
  return result[0];
};

/**
 * Fetch total cost of all sales for a given location
 * @param locationId Location ID to filter sales records
 * @returns Total cost as a number (0 if no sales records)
 */
export const fetchTotalSaleCostForLocation = async (locationId: number): Promise<number> => {
  const result = await execute(sql`
    SELECT COALESCE(SUM(cost), 0) AS total_cost
    FROM sale
    WHERE location_id = ${locationId};
  `);

  return result.length > 0 ? Number(result[0].total_cost) : 0;
};

/**
 * Create a sale record in the database in the sale table
 * @param data The sale data
 * @returns The newly created sale from the database
 */
export const createSale = async (data: SaleInsert) => {
  const parsed = SaleInsertSchema.parse(data);
  const { recipeId, quantity, cost, staffId, locationId } = parsed;

  const result = await execute(sql`
    INSERT INTO sale (recipe_id, quantity, cost, staff_id, location_id, created_at, updated_at)
    VALUES (${recipeId}, ${quantity}, ${cost}, ${staffId}, ${locationId}, DEFAULT, DEFAULT)
    RETURNING *;
  `);
  return result[0];
};

/**
 * Delete a sale from the database using its given ID
 * @param id The sale ID
 * @returns The execution metadata of the query
 */
export const removeSale = async (id: number) => {
  const result = await execute(sql`DELETE FROM sale WHERE id = ${id}`);
  return result;
};
