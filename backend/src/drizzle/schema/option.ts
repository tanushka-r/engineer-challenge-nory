import {
  pgTable,
  varchar,
  integer,
  decimal,
  timestamp,
} from 'drizzle-orm/pg-core';

export const option = pgTable('option', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name').notNull(),
  price: decimal('price').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
