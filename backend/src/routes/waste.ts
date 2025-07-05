import { Router } from 'express';
import {
  getAllWasteForLocation,
  getTotalWasteCostForLocation,
  postWaste,
  deleteWaste,
} from '../controllers/waste';

export const wasteRoute = Router();

wasteRoute.get('/location/:locationId', getAllWasteForLocation);
wasteRoute.get('/location/:locationId/total-cost', getTotalWasteCostForLocation);
wasteRoute.post('/', postWaste);
wasteRoute.delete('/:id', deleteWaste);

export default wasteRoute;
