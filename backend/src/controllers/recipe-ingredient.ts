import { Request, Response, NextFunction } from 'express';
import { fetchIngredientsForRecipe } from '../services/recipe-ingredient';

export const getIngredientsForRecipe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const recipeId = parseInt(req.params.recipeId, 10);

    if (isNaN(recipeId)) {
      res.status(400).json({ message: 'recipeId is required and must be a number' });
      return;
    }

    const ingredients = await fetchIngredientsForRecipe(recipeId);

    res.json(ingredients);
  } catch (err) {
    next(err);
  }
};
