import { pgTable, varchar, integer, timestamp } from 'drizzle-orm/pg-core';

export const location = pgTable('location', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name').notNull(),
  address: varchar('address').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
