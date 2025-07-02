import { pgTable, integer, decimal, timestamp, primaryKey } from 'drizzle-orm/pg-core';

import { recipe } from './recipe';
import { location } from './location';
import { modifier } from './modifier';

export const menu = pgTable('menu', {
  recipeId: integer('recipe_id').references(() => recipe.id),
  locationId: integer('location_id').references(() => location.id),
  price: decimal('price').notNull(),
  modifierId: integer('modifier_id').references(() => modifier.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  primaryKey({ columns: [table.recipeId, table.locationId] }),
]);
