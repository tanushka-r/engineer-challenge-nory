import { sql } from 'drizzle-orm';
import { execute } from '../lib/db';
import { DeliveryInsertSchema, DeliveryInsert } from '../models/delivery';

/**
 * Fetch all deliveries
 * @returns The result of the query as a list of deliveries
 */
export const fetchAllDeliveries = async () => {
  return execute(sql`SELECT * FROM delivery`);
};

/**
 * Fetch all deliveries for a specific location
 * @param locationId The ID of the location
 * @returns The result of the query as a list of deliveries for that location
 */
export const fetchAllDeliveriesForLocation = async (locationId: number) => {
  return execute(sql`SELECT * FROM delivery WHERE location_id = ${locationId}`);
};

/**
 * Fetch a single delivery using it's given ID
 * @param id The delivery ID
 * @returns The data of a single delivery records from the database
 */
export const fetchSingleDelivery = async (id: number) => {
  const result = await execute(sql`SELECT * FROM delivery WHERE id = ${id}`);
  return result[0];
};

/**
 * Fetch total cost of all deliveries for a given location
 * @param locationId Location ID to filter delivery records
 * @returns Total cost as a number (0 if no delivery records)
 */
export const fetchTotalDeliveryCostForLocation = async (locationId: number): Promise<number> => {
  const result = await execute(sql`
    SELECT COALESCE(SUM(cost), 0) AS total_cost
    FROM delivery
    WHERE location_id = ${locationId};
  `);

  return result.length > 0 ? Number(result[0].total_cost) : 0;
};

/**
 * Create a delivery record in the database in the delivery table
 * @param data The delivery data
 * @returns The newly creted delivery from the database
 */
export const createDelivery = async (data: DeliveryInsert) => {
  const parsed = DeliveryInsertSchema.parse(data);
  const { ingredientId, quantity, cost, staffId, locationId } = parsed;

  const result = await execute(sql`
    INSERT INTO delivery (ingredient_id, quantity, cost, staff_id, location_id, created_at, updated_at)
    VALUES (${ingredientId}, ${quantity}, ${cost}, ${staffId}, ${locationId}, DEFAULT, DEFAULT)
    RETURNING *;
  `);
  return result[0];
};

/**
 * Delete an delivery from the database using it's given id
 * @param id The delivery ID
 * @returns The execution metadata of the query
 */
export const removeDelivery = async (id: number) => {
  const result = await execute(sql`DELETE FROM delivery WHERE id = ${id}`);
  return result;
};
