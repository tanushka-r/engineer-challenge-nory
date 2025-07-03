import { Request, Response, NextFunction, RequestHandler } from 'express';
import { fetchAllIngredients, fetchSingleIngredient, createIngredient, removeIngredient} from '../services/ingredient';
import { IngredientInsert } from '../models/ingredient';

export const getIngredients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ingredients = await fetchAllIngredients();
    res.json(ingredients);
  } catch (err) {
    next(err);
  }
};

export const getSingleIngredient: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const ingredient = await fetchSingleIngredient(id);
    if (!ingredient) res.status(404).json({ message: 'Not found' });
    res.json(ingredient);
  } catch (err) {
    next(err);
  }
};

export const postIngredient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = <IngredientInsert>req.body;
    const newIngredient = await createIngredient(data);
    res.status(201).json(newIngredient);
  } catch (err) {
    next(err);
  }
};

export const deleteIngredient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    await removeIngredient(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
