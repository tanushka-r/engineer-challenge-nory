import { sql } from 'drizzle-orm';
import { execute } from '../lib/db';

/**
 * Fetch all recipe ingredients with associated ingredient details
 * @param recipeId ID of the recipe
 * @returns List of recipe ingredients
 */
export const fetchIngredientsForRecipe = async (recipeId: number) => {
  return execute(sql`
    SELECT
      recipe_ingredient.*,
      ingredient.name AS ingredient_name,
      ingredient.cost AS ingredient_cost
    FROM recipe_ingredient
    LEFT JOIN ingredient ON recipe_ingredient.ingredient_id = ingredient.id
    WHERE recipe_ingredient.recipe_id = ${recipeId};
  `);
};
