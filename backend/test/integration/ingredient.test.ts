import request from 'supertest';
import app from '../../src/index';
import * as db from '../../src/lib/db';

describe('Ingredient API Integration Tests', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('GET /api/v1/ingredients', () => {
    it('should return all ingredients', async () => {
      const mockIngredients = [
        { id: 1, name: 'Salt', cost: 2.5, unit_id: 1, unit_name: 'g' },
        { id: 2, name: 'Sugar', cost: 3.0, unit_id: 1, unit_name: 'g' },
      ];
      jest.spyOn(db, 'execute').mockResolvedValueOnce(mockIngredients);

      const res = await request(app).get('/api/v1/ingredients');
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockIngredients);
    });

    it('should return 500 on DB error', async () => {
      jest.spyOn(db, 'execute').mockImplementationOnce(() => { throw new Error('DB Error'); });

      const res = await request(app).get('/api/v1/ingredients');
      expect(res.status).toBe(500);
    });
  });

  describe('GET /api/v1/ingredients/:id', () => {
    it('should return a single ingredient', async () => {
      const mockIngredient = [{ id: 1, name: 'Salt', cost: 2.5, unit_id: 1, unit_name: 'g' }];
      jest.spyOn(db, 'execute').mockResolvedValueOnce(mockIngredient);

      const res = await request(app).get('/api/v1/ingredients/1');
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockIngredient[0]);
    });

    it('should return 500 on error', async () => {
      jest.spyOn(db, 'execute').mockImplementationOnce(() => { throw new Error('fail'); });

      const res = await request(app).get('/api/v1/ingredients/1');
      expect(res.status).toBe(500);
    });
  });

  describe('POST /api/v1/ingredients', () => {
    const newIngredient = { name: 'Flour', cost: '4.0', unitId: 1 };
    const mockInsertResult = [{ id: 3, name: 'Flour', cost: '4.0', unit_id: 1 }];

    it('should create an ingredient and return it', async () => {
      jest.spyOn(db, 'execute').mockResolvedValueOnce(mockInsertResult);

      const res = await request(app).post('/api/v1/ingredients').send(newIngredient);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(mockInsertResult[0]);
    });

    it('should return 500 on error', async () => {
      jest.spyOn(db, 'execute').mockRejectedValueOnce(new Error('fail'));

      const res = await request(app).post('/api/v1/ingredients').send(newIngredient);

      expect(res.status).toBe(500);
    });
  });

  describe('DELETE /api/v1/ingredients/:id', () => {
    it('should delete an ingredient and return 204 No Content', async () => {
      jest.spyOn(db, 'execute').mockResolvedValueOnce([{ rowCount: 1 }]);

      const res = await request(app).delete('/api/v1/ingredients/1');

      expect(res.status).toBe(204);
      expect(res.body).toEqual({});
    });

    it('should return 500 on error', async () => {
      jest.spyOn(db, 'execute').mockRejectedValueOnce(new Error('fail'));

      const res = await request(app).delete('/api/v1/ingredients/1');

      expect(res.status).toBe(500);
    });
  });
});
