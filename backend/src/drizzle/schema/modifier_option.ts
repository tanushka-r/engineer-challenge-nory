import { pgTable, integer, timestamp, primaryKey } from 'drizzle-orm/pg-core';

import { modifier } from './modifier';
import { option } from './option'; 

export const modifier_option = pgTable('modifier_option', {
  modifierId: integer('modifier_id').references(() => modifier.id),
  optionId: integer('option_id').references(() => option.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  primaryKey({ columns: [table.modifierId, table.optionId] }),
]);
