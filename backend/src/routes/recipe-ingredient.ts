import { Router } from 'express';
import { getIngredientsForRecipe } from '../controllers/recipe-ingredient';

export const recipeIngredientRoute = Router();

recipeIngredientRoute.get('/:recipeId', getIngredientsForRecipe);

export default recipeIngredientRoute;
