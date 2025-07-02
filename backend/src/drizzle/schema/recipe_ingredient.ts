import { pgTable, integer, decimal, timestamp, primaryKey } from 'drizzle-orm/pg-core';

import { recipe } from './recipe';
import { ingredient } from './ingredient'; 

export const recipe_ingredient = pgTable('recipe_ingredient', {
  recipeId: integer('recipe_id').references(() => recipe.id),
  ingredientId: integer('ingredient_id').references(() => ingredient.id),
  quantity: decimal('quantity').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  primaryKey({ columns: [table.recipeId, table.ingredientId] }),
]);
