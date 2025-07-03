import { createInsertSchema } from 'drizzle-zod';
import { ingredient } from '../drizzle/schema/ingredient';
import { z, ZodObject } from 'zod';

export const IngredientInsertSchema = createInsertSchema(ingredient) as unknown as ZodObject<any>;

export type IngredientInsert = z.infer<typeof IngredientInsertSchema>;
