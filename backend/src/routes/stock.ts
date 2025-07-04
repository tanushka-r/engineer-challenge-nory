import { Router } from 'express';
import {
  getAllStockForLocation,
  getStockByIngredientAndLocation,
  postStock,
  putStock,
  deleteStock,
} from '../controllers/stock';

export const stockRoute = Router();

stockRoute.get('/location/:locationId', getAllStockForLocation);
stockRoute.get('/location/:locationId/ingredients', getStockByIngredientAndLocation);
stockRoute.post('/', postStock);
stockRoute.put('/', putStock);
stockRoute.delete('/location/:locationId/ingredient/:ingredientId', deleteStock);

export default stockRoute;
