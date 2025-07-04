import { createInsertSchema } from 'drizzle-zod';
import { ingredient } from '../drizzle/schema/ingredient';
import { z, ZodObject } from 'zod';

export const DeliveryInsertSchema = createInsertSchema(ingredient) as unknown as ZodObject<any>;

export type DeliveryInsert = z.infer<typeof DeliveryInsertSchema>;
