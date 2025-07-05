import { Router } from 'express';
import {
  getDeliveries,
  getDeliveriesForLocation,
  getSingleDelivery,
  getTotalDeliveryCostForLocation,
  postDelivery,
  deleteDelivery 
} from '../controllers/delivery';

export const deliveryRoute = Router();

deliveryRoute.get('/', getDeliveries);
deliveryRoute.get('/location/:locationId', getDeliveriesForLocation);
deliveryRoute.get('/:id', getSingleDelivery);
deliveryRoute.get('/location/:locationId/total-cost', getTotalDeliveryCostForLocation);
deliveryRoute.post('/', postDelivery);
deliveryRoute.delete('/:id', deleteDelivery);

export default deliveryRoute;
