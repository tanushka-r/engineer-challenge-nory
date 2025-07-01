// drizzle/schema/staff.ts
import {
  pgTable,
  serial,
  varchar,
  integer,
  date,
  timestamp,
} from 'drizzle-orm/pg-core';

export const staff = pgTable('staff', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name').notNull(),
  locationId: integer('location_id').notNull(),
  dateOfBirth: date('date_of_birth').notNull(),
  iban: varchar('iban').notNull(),
  bic: varchar('bic').notNull(),
});

