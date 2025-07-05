import { Request, Response, NextFunction, RequestHandler } from 'express';
import {
  fetchAllDeliveries,
  fetchAllDeliveriesForLocation,
  fetchSingleDelivery,
  fetchTotalDeliveryCostForLocation,
  createDelivery,
  removeDelivery
} from '../services/delivery';
import { DeliveryInsert } from '../models/delivery';

export const getDeliveries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const delivery = await fetchAllDeliveries();
    res.json(delivery);
  } catch (err) {
    next(err);
  }
};

export const getDeliveriesForLocation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const locationId = parseInt(req.params.locationId, 10);

    if (isNaN(locationId)) {
      res.status(400).json({ error: 'Invalid or missing locationId query parameter' });
      return;
    }

    const deliveries = await fetchAllDeliveriesForLocation(locationId);
    res.json(deliveries);
  } catch (err) {
    next(err);
  }
};

export const getSingleDelivery: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const delivery = await fetchSingleDelivery(id);
    if (!delivery) {
      res.status(404).json({ message: 'Not found' });
    }
    res.json(delivery);
  } catch (err) {
    next(err);
  }
};

export const getTotalDeliveryCostForLocation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const locationId = parseInt(req.params.locationId, 10);

    if (isNaN(locationId)) {
      res.status(400).json({ message: 'locationId is required and must be a number' });
      return;
    }

    const totalCost = await fetchTotalDeliveryCostForLocation(locationId);

    res.json({ totalCost });
  } catch (err) {
    next(err);
  }
};

export const postDelivery = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = <DeliveryInsert>req.body;
    const newDelivery = await createDelivery(data);
    res.status(201).json(newDelivery);
  } catch (err) {
    next(err);
  }
};

export const deleteDelivery = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    await removeDelivery(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
