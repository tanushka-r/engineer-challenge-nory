import { createInsertSchema } from 'drizzle-zod';
import { waste } from '../drizzle/schema/waste';
import { z, ZodObject } from 'zod';

export const WasteInsertSchema = createInsertSchema(waste) as unknown as ZodObject<any>;

export type WasteInsert = z.infer<typeof WasteInsertSchema>;
