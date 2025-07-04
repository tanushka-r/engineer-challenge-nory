import { Router } from 'express';
import { getDeliveries, getSingleDelivery, postDelivery, deleteDelivery } from '../controllers/delivery';

export const deliveryRoute = Router();

deliveryRoute.get('/', getDeliveries);
deliveryRoute.get('/:id', getSingleDelivery);
deliveryRoute.post('/', postDelivery);
deliveryRoute.delete('/:id', deleteDelivery);

export default deliveryRoute;
