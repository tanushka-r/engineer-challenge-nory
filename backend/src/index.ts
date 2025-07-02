import express, { Request, Response } from 'express';
import { db } from './lib/db';
import { staff } from './drizzle/schema/staff';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/staff', async (req: Request, res: Response) => {
  const allStaff = await db.select().from(staff);
  res.json(allStaff);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
