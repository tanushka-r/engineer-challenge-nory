import { createInsertSchema } from 'drizzle-zod';
import { delivery } from '../drizzle/schema/delivery';
import { z, ZodObject } from 'zod';

export const DeliveryInsertSchema = createInsertSchema(delivery) as unknown as ZodObject<any>;

export type DeliveryInsert = z.infer<typeof DeliveryInsertSchema>;
