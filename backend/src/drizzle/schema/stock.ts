import { pgTable, integer, decimal, timestamp, primaryKey } from 'drizzle-orm/pg-core';

import { location } from './location';
import { ingredient } from './ingredient'; 

export const stock = pgTable('stock', {
  ingredientId: integer('ingredient_id').references(() => ingredient.id),
  locationId: integer('location_id').references(() => location.id),
  quantity: decimal('quantity').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  primaryKey({ columns: [table.ingredientId, table.locationId]}),
]);
