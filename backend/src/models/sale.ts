import { createInsertSchema } from 'drizzle-zod';
import { sale } from '../drizzle/schema/sale';
import { z, ZodObject } from 'zod';

export const SaleInsertSchema = createInsertSchema(sale) as unknown as ZodObject<any>;

export type SaleInsert = z.infer<typeof SaleInsertSchema>;
