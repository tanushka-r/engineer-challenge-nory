import { Router } from 'express';
import { getStaff, getSingleStaff } from '../controllers/staff';

export const staffRoute = Router();

staffRoute.get('/', getStaff);
staffRoute.get('/:id', getSingleStaff);


export default staffRoute;
