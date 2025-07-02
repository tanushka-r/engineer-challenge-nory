import { pgTable, varchar, integer, timestamp } from 'drizzle-orm/pg-core';

export const recipe = pgTable('recipe', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
