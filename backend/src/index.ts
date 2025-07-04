import express, { Express, Request, Response } from 'express';
import { errorHandler } from './middleware/error';
import { ingredientRoute } from './routes/ingredient';
import { deliveryRoute } from './routes/delivery';
import { locationRoute } from './routes/location';
import { staffRoute } from './routes/staff';
import { stockRoute } from './routes/stock';
import cors from 'cors';
import { z } from 'zod';


const app: Express = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('The server is running 🏃‍♀️');
});

app.get('/error', (req, res, next) => {
  // Throw a normal error to test errorHandler
  next(new Error('Test error!'));
});

const schema = z.object({
  name: z.string(),
});

app.post('/test-zod', (req, res, next) => {
  try {
    schema.parse(req.body);
    res.send('Valid!');
  } catch (err) {
    next(err);
  }
});

stockRoute.get('/test', (req, res) => {
  res.json({ message: 'Stock route is working!' });
});

/**
 * Error handler middleware
 */
app.use(errorHandler);

/**
 * Assign the API routes to the main app
 */
const rootApi = '/api/v1';

app.use(`${rootApi}/ingredients`, ingredientRoute);
app.use(`${rootApi}/deliveries`, deliveryRoute);
app.use(`${rootApi}/locations`, locationRoute);
app.use(`${rootApi}/staff`, staffRoute);
app.use(`${rootApi}/stock`, stockRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;
