import { createInsertSchema } from 'drizzle-zod';
import { stock } from '../drizzle/schema/stock';
import { z, ZodObject } from 'zod';

export const StockInsertSchema = createInsertSchema(stock) as unknown as ZodObject<any>;

export type StockInsert = z.infer<typeof StockInsertSchema>;
