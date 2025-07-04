import { Request, Response, NextFunction, RequestHandler } from 'express';
import { fetchAllLocations, fetchSingleLocation } from '../services/location';

export const getLocations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const locations = await fetchAllLocations();
    res.json(locations);
  } catch (err) {
    next(err);
  }
};

export const getSingleLocation: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const location = await fetchSingleLocation(id);
    if (!location) {
      res.status(404).json({ message: 'Not found' });
    }
    res.json(location);
  } catch (err) {
    next(err);
  }
};
