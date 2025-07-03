import {
  pgTable,
  varchar,
  integer,
  date,
  timestamp,
} from 'drizzle-orm/pg-core';

import { role } from './role';

export const staff = pgTable('staff', {
  id: integer('id').primaryKey().notNull(),
  name: varchar('name').notNull(),
  dob: date('dob').notNull(),
  iban: varchar('iban').notNull(),
  bic: varchar('bic').notNull(),
  roleId: integer('role_id').notNull().references(() => role.id), 
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
