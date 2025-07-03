import {
  pgTable,
  varchar,
  integer,
  decimal,
  timestamp,
} from 'drizzle-orm/pg-core';

import { modifier_type } from './modifier_type';

export const modifier = pgTable('modifier', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name').notNull(),
  price: decimal('price').notNull(),
  modifierTypeId: integer('modifier_type_id').references(() => modifier_type.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
