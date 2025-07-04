import { Request, Response, NextFunction, RequestHandler } from 'express';
import { fetchAllStaff, fetchSingleStaff } from '../services/staff';

export const getStaff = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const staff = await fetchAllStaff();
    res.json(staff);
  } catch (err) {
    next(err);
  }
};

export const getSingleStaff: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const staff = await fetchSingleStaff(id);
    if (!staff) {
      res.status(404).json({ message: 'Not found' });
    }
    res.json(staff);
  } catch (err) {
    next(err);
  }
};
