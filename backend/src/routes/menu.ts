import { Router } from 'express';
import { getAllMenusForLocation } from '../controllers/menu';

export const menuRoute = Router();

menuRoute.get('/location/:locationId', getAllMenusForLocation);

export default menuRoute;
