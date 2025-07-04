import { Request, Response, NextFunction, RequestHandler } from 'express';
import { fetchAllDeliveries, fetchSingleDelivery, createDelivery, removeDelivery} from '../services/delivery';
import { DeliveryInsert } from '../models/delivery';

export const getDeliveries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ingredients = await fetchAllDeliveries();
    res.json(ingredients);
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

export const postDelivery = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = <DeliveryInsert>req.body;
    const newIngredient = await createDelivery(data);
    res.status(201).json(newIngredient);
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
