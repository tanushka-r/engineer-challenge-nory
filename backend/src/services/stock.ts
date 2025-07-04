import { sql } from 'drizzle-orm';
import { execute } from '../lib/db';
import { StockUpdateMode } from '../types/types';

/**
 * Fetch all stock entries for a given location
 * @param locationId Location ID to filter stock
 * @returns List of stock records for the location
 */
export const fetchAllStockForLocation = async (locationId: number) => {
  return execute(sql`
    SELECT
      stock.*,
      ingredient.name AS ingredient_name,
      location.name AS location_name
    FROM stock
    LEFT JOIN ingredient ON stock.ingredient_id = ingredient.id
    LEFT JOIN location ON stock.location_id = location.id
    WHERE stock.location_id = ${locationId};
  `);
};

/**
 * Fetch stock entries for a list of ingredient IDs, filtered by location
 * @param ingredientIds Array of ingredient IDs
 * @param locationId Location ID
 * @returns Matching stock records at the specified location
 */
export const fetchStockByIngredientAndLocation = async (ingredientIds: number[], locationId: number) => {
  if (ingredientIds.length === 0) return [];

  return execute(sql`
    SELECT
      stock.*,
      ingredient.name AS ingredient_name,
      location.name AS location_name
    FROM stock
    LEFT JOIN ingredient ON stock.ingredient_id = ingredient.id
    LEFT JOIN location ON stock.location_id = location.id
    WHERE stock.ingredient_id IN (${sql.join(ingredientIds, sql.raw(', '))})
      AND stock.location_id = ${locationId};
  `);
};

/**
 * Create a new stock record
 * @param ingredientId Ingredient ID
 * @param locationId Location ID
 * @param quantity Quantity of the stock
 * @returns The newly created stock record
 */
export const createStock = async (ingredientId: number, locationId: number, quantity: number) => {
  const result = await execute(sql`
    INSERT INTO stock (ingredient_id, location_id, quantity, created_at, updated_at)
    VALUES (${ingredientId}, ${locationId}, ${quantity}, DEFAULT, DEFAULT)
    RETURNING *;
  `);
  return result[0];
};

/**
 * Update the quantity of a stock entry (upsert-like behavior)
 * If the record exists, it updates quantity & updated_at
 * Otherwise, it inserts a new stock entry
 * @param ingredientId Ingredient ID
 * @param locationId Location ID
 * @param quantity New quantity to set
 * @param mode The mode of operation
 * @returns Updated or created stock record
 */
export const updateStock = async (
  ingredientId: number,
  locationId: number,
  quantity: number,
  mode: StockUpdateMode = 'overwrite'
) => {
  const result = await execute(sql`
    INSERT INTO stock (ingredient_id, location_id, quantity, created_at, updated_at)
    VALUES (${ingredientId}, ${locationId}, ${quantity}, DEFAULT, DEFAULT)
    ON CONFLICT (ingredient_id, location_id)
    DO UPDATE SET
      quantity = CASE
        WHEN ${mode} = 'increase' THEN stock.quantity + EXCLUDED.quantity
        WHEN ${mode} = 'decrease' THEN GREATEST(stock.quantity - EXCLUDED.quantity, 0)
        ELSE EXCLUDED.quantity
      END,
      updated_at = now()
    RETURNING *;
  `);

  return result[0];
};

/**
 * Delete a stock entry
 * @param ingredientId Ingredient ID
 * @param locationId Location ID
 * @returns Execution result
 */
export const removeStock = async (ingredientId: number, locationId: number) => {
  return execute(sql`
    DELETE FROM stock
    WHERE ingredient_id = ${ingredientId} AND location_id = ${locationId};
  `);
};
