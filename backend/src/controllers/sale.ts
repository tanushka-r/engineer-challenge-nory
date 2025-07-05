import { Request, Response, NextFunction, RequestHandler } from 'express';
import {
  fetchAllSales,
  fetchAllSalesForLocation,
  fetchSingleSale,
  fetchTotalSaleCostForLocation,
  createSale,
  removeSale
} from '../services/sale';
import { SaleInsert } from '../models/sale';

export const getSales = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sales = await fetchAllSales();
    res.json(sales);
  } catch (err) {
    next(err);
  }
};

export const getSalesForLocation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const locationId = parseInt(req.params.locationId, 10);

    if (isNaN(locationId)) {
      res.status(400).json({ error: 'Invalid or missing locationId parameter' });
      return;
    }

    const sales = await fetchAllSalesForLocation(locationId);
    res.json(sales);
  } catch (err) {
    next(err);
  }
};

export const getSingleSale: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const sale = await fetchSingleSale(id);
    if (!sale) {
      res.status(404).json({ message: 'Not found' });
      return;
    }
    res.json(sale);
  } catch (err) {
    next(err);
  }
};

export const getTotalSaleCostForLocation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const locationId = parseInt(req.params.locationId, 10);

    if (isNaN(locationId)) {
      res.status(400).json({ message: 'locationId is required and must be a number' });
      return;
    }

    const totalCost = await fetchTotalSaleCostForLocation(locationId);

    res.json({ totalCost });
  } catch (err) {
    next(err);
  }
};

export const postSale = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = <SaleInsert>req.body;
    const newSale = await createSale(data);
    res.status(201).json(newSale);
  } catch (err) {
    next(err);
  }
};

export const deleteSale = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    await removeSale(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
