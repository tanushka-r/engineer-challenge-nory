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
 * Fetch a single delivery using it's given ID
 * @param id The delivery ID
 * @returns The data of a single delivery records from the database
 */
export const fetchSingleDelivery = async (id: number) => {
  const result = await execute(sql`SELECT * FROM delivery WHERE id = ${id}`);
  return result[0];
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
