import { Request, Response, NextFunction } from 'express';
import {
  fetchAllStockForLocation,
  fetchStockByIngredientAndLocation,
  createStock,
  updateStock,
  removeStock,
} from '../services/stock';
import { parseCommaSeparatedNumbers } from '../lib/utils';

export const getAllStockForLocation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const locationId = parseInt(req.params.locationId, 10);

    if (isNaN(locationId)) {
      res.status(400).json({ message: 'locationId is required and must be a number' });
      return;
    }

    const stocks = await fetchAllStockForLocation(locationId);

    res.json(stocks);
  } catch (err) {
    next(err);
  }
};


export const getStockByIngredientAndLocation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const locationId = parseInt(req.params.locationId, 10);
    const rawIngredientIds = req.query.ingredientIds as string;

    if (!rawIngredientIds || isNaN(locationId)) {
      res.status(400).json({ message: 'locationId and ingredientIds are required' });
      return;
    }

    const ingredientIds = parseCommaSeparatedNumbers(rawIngredientIds);

    if (ingredientIds.length === 0) {
      res.status(400).json({ message: 'No valid ingredientIds provided' });
      return;
    }

    const stocks = await fetchStockByIngredientAndLocation(ingredientIds, locationId);
    res.json(stocks);
  } catch (err) {
    next(err);
  }
};


export const postStock = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ingredientId, locationId, quantity } = req.body;

    const newStock = await createStock(ingredientId, locationId, quantity);

    res.status(201).json(newStock);
  } catch (err) {
    next(err);
  }
};

export const putStock = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ingredientId, locationId, quantity } = req.body;

    const updated = await updateStock(ingredientId, locationId, quantity);

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteStock = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const locationId = parseInt(req.params.locationId, 10);
    const ingredientId = parseInt(req.params.ingredientId, 10);

    if (isNaN(ingredientId) || isNaN(locationId)) {
      res.status(400).json({ message: 'Invalid ingredientId or locationId' });
      return;
    }

    await removeStock(ingredientId, locationId);

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

