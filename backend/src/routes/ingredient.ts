import { Router } from 'express';
import { getIngredients, getSingleIngredient, postIngredient, deleteIngredient } from '../controllers/ingredient';

export const ingredientRoute = Router();

ingredientRoute.get('/', getIngredients);
ingredientRoute.get('/:id', getSingleIngredient);
ingredientRoute.post('/', postIngredient);
ingredientRoute.delete('/:id', deleteIngredient);

export default ingredientRoute;
