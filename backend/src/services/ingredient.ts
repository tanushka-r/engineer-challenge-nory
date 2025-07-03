import { sql } from 'drizzle-orm';
import { execute } from '../lib/db';
import { IngredientInsertSchema, IngredientInsert } from '../models/ingredient';

/**
 * Fetch all ingredients
 * @returns The result of the query as a list of ingredients
 */
export const fetchAllIngredients = async () => {
  return execute(sql`SELECT * FROM ingredient`);
};

/**
 * Fetch a single ingredient using it's given ID
 * @param id The ingredient ID
 * @returns The data of a single ingredient records from the database
 */
export const fetchSingleIngredient = async (id: number) => {
  const result = await execute(sql`SELECT * FROM ingredient WHERE id = ${id}`);
  return result[0];
};

/**
 * Create an ingredient record in the database in the ingredient table
 * @param data The ingredient data
 * @returns The newly creted ingredient from the database
 */
export const createIngredient = async (data: IngredientInsert) => {
  const parsed = IngredientInsertSchema.parse(data);
  const { name, cost, unitId } = parsed;

  const result = await execute(sql`
    INSERT INTO ingredient (name, cost, unit_id, created_at, updated_at)
    VALUES (${name}, ${cost}, ${unitId}, DEFAULT, DEFAULT)
    RETURNING *;
  `);
  return result[0];
};

/**
 * Delete an ingredient from the database using it's given id
 * @param id The ingredient ID
 * @returns The execution metadata of the query
 */
export const removeIngredient = async (id: number) => {
  const result = await execute(sql`DELETE FROM ingredient WHERE id = ${id}`);
  return result;
};
