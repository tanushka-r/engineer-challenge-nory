import { Router } from 'express';
import {
  getSales,
  getSalesForLocation,
  getSingleSale,
  postSale,
  deleteSale
} from '../controllers/sale';

export const saleRoute = Router();

saleRoute.get('/', getSales);
saleRoute.get('/location/:locationId', getSalesForLocation);
saleRoute.get('/:id', getSingleSale);
saleRoute.post('/', postSale);
saleRoute.delete('/:id', deleteSale);

export default saleRoute;
