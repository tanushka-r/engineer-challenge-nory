import {
  pgTable,
  integer,
  decimal,
  timestamp,
} from 'drizzle-orm/pg-core';

import { staff } from './staff';
import { location } from './location';
import { ingredient } from './ingredient';

export const delivery = pgTable('delivery', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  ingredientId: integer('ingredient_id').references(() => ingredient.id),
  quantity: decimal('quantity').notNull(),
  cost: decimal('cost').notNull(),
  staffId: integer('staff_id').references(() => staff.id),
  locationId: integer('location_id').references(() => location.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
