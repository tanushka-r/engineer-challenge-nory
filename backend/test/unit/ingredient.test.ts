import * as db from '../../src/lib/db';
import * as ingredientService from '../../src/services/ingredient';
import { IngredientInsert } from '../../src/models/ingredient';

jest.mock('../../src/lib/db');

describe('Ingredient Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchAllIngredients', () => {
    it('should return all ingredients from the database', async () => {
      const mockResult = [{ id: 1, name: 'Salt', unit_name: 'g' }];
      (db.execute as jest.Mock).mockResolvedValueOnce(mockResult);

      const result = await ingredientService.fetchAllIngredients();
      expect(result).toEqual(mockResult);
      expect(db.execute).toHaveBeenCalledTimes(1);
    });
  });

  describe('fetchSingleIngredient', () => {
    it('should return one ingredient by id', async () => {
      const mockResult = [{ id: 2, name: 'Sugar', unit_name: 'kg' }];
      (db.execute as jest.Mock).mockResolvedValueOnce(mockResult);

      const result = await ingredientService.fetchSingleIngredient(2);
      expect(result).toEqual(mockResult[0]);
      expect(db.execute).toHaveBeenCalledWith(expect.anything());
    });
  });

  describe('createIngredient', () => {
    it('should create an ingredient and return it', async () => {
      const mockInput: IngredientInsert = { name: 'Flour', cost: '3.5', unitId: 1 }; // cost as string
      const mockResult = [{ id: 3, name: 'Flour', cost: '3.5', unit_id: 1 }];
      (db.execute as jest.Mock).mockResolvedValueOnce(mockResult);

      const result = await ingredientService.createIngredient(mockInput);
      expect(result).toEqual(mockResult[0]);
      expect(db.execute).toHaveBeenCalledTimes(1);
    });

    it('should throw if invalid data is passed', async () => {
      const invalidData = { name: '', cost: '-1', unitId: 999 }; // also cost as string here
      await expect(ingredientService.createIngredient(invalidData as any)).rejects.toThrow();
    });
  });

  describe('removeIngredient', () => {
    it('should call delete and return result', async () => {
      const mockResult = { rowCount: 1 };
      (db.execute as jest.Mock).mockResolvedValueOnce(mockResult);

      const result = await ingredientService.removeIngredient(1);
      expect(result).toEqual(mockResult);
      expect(db.execute).toHaveBeenCalledWith(expect.anything());
    });
  });
});
