import { pgTable, integer, timestamp, primaryKey } from 'drizzle-orm/pg-core';

import { location } from './location';
import { staff } from './staff'; 

export const location_staff = pgTable('location_staff', {
  locationId: integer('location_id').references(() => location.id),
  staffId: integer('staff_id').references(() => staff.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  primaryKey({ columns: [table.staffId, table.locationId]}),
]);
