import {
  pgTable,
  varchar,
  integer,
  decimal,
  timestamp,
} from 'drizzle-orm/pg-core';

import { unit } from './unit';

export const ingredient = pgTable('ingredient', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name').notNull(),
  cost: decimal('cost').notNull(),
  unitId: integer('unit_id').references(() => unit.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
