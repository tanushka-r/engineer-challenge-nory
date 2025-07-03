import {
  pgTable,
  integer,
  decimal,
  timestamp,
  foreignKey
} from 'drizzle-orm/pg-core';

import { staff } from './staff';
import { menu } from './menu';

export const sale = pgTable('sale', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  recipeId: integer('recipe_id'),
  locationId: integer('location_id'),
  quantity: decimal('quantity').notNull(),
  cost: decimal('cost').notNull(),
  staffId: integer('staffId').references(() => staff.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  // composite foreign key to menu table
  menuRef: foreignKey({
    columns: [table.recipeId, table.locationId],
    foreignColumns: [menu.recipeId, menu.locationId],
  }),
}));
