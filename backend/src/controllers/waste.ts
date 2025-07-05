import { Request, Response, NextFunction } from 'express';
import {
  fetchAllWasteForLocation,
  fetchTotalWasteCostForLocation,
  createWaste,
  removeWaste,
} from '../services/waste';

export const getAllWasteForLocation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const locationId = parseInt(req.params.locationId, 10);

    if (isNaN(locationId)) {
      res.status(400).json({ message: 'locationId is required and must be a number' });
      return;
    }

    const waste = await fetchAllWasteForLocation(locationId);

    res.json(waste);
  } catch (err) {
    next(err);
  }
};

export const getTotalWasteCostForLocation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const locationId = parseInt(req.params.locationId, 10);

    if (isNaN(locationId)) {
      res.status(400).json({ message: 'locationId is required and must be a number' });
      return;
    }

    const totalCost = await fetchTotalWasteCostForLocation(locationId);

    res.json({ totalCost });
  } catch (err) {
    next(err);
  }
};

export const postWaste = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ingredientId, locationId, quantity, cost, staffId } = req.body;

    const newWaste = await createWaste(ingredientId, locationId, quantity, cost, staffId);

    res.status(201).json(newWaste);
  } catch (err) {
    next(err);
  }
};

export const deleteWaste = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const wasteId = parseInt(req.params.id);
    
    await removeWaste(wasteId);

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
