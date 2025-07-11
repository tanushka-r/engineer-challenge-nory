import { pgTable, varchar, integer, timestamp } from 'drizzle-orm/pg-core';

export const unit = pgTable('unit', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
