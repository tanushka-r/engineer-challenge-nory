import { Router } from 'express';
import {
  getAllStockForLocation,
  getStockByIngredientAndLocation,
  getTotalStockCostForLocation,
  postStock,
  putStock,
  deleteStock,
} from '../controllers/stock';

export const stockRoute = Router();

stockRoute.get('/location/:locationId', getAllStockForLocation);
stockRoute.get('/location/:locationId/ingredients', getStockByIngredientAndLocation);
stockRoute.get('/location/:locationId/total-cost', getTotalStockCostForLocation);
stockRoute.post('/', postStock);
stockRoute.put('/', putStock);
stockRoute.delete('/location/:locationId/ingredient/:ingredientId', deleteStock);

export default stockRoute;
