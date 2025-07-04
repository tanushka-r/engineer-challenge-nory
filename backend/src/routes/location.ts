import { Router } from 'express';
import { getLocations, getSingleLocation } from '../controllers/location';

export const locationRoute = Router();

locationRoute.get('/', getLocations);
locationRoute.get('/:id', getSingleLocation);


export default locationRoute;
