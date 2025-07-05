import { Request, Response, NextFunction } from 'express';
import { fetchAllMenusForLocation } from '../services/menu';

export const getAllMenusForLocation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const locationId = parseInt(req.params.locationId, 10);

    if (isNaN(locationId)) {
      res.status(400).json({ message: 'locationId is required and must be a number' });
      return;
    }

    const menus = await fetchAllMenusForLocation(locationId);

    res.json(menus);
  } catch (err) {
    next(err);
  }
};
