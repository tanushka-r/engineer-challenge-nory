import '@testing-library/jest-dom';
import { getOutOfStockIngredients, generateStockUpdatePayload } from '../../src/lib/utils';
import { type RecipeIngredient, type StockItem, type StockBatchUpdateRequest, type StockUpdateMode, STOCK_MODE } from '../../src/types/types';

const ingredients: RecipeIngredient[] = [
  { 
    ingredient_id: 1,
    recipe_id: 100,
    ingredient_name: 'Sugar',
    ingredient_cost: '0.5',
    quantity: '5',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
  },
  { 
    ingredient_id: 2,
    recipe_id: 100,
    ingredient_name: 'Flour',
    ingredient_cost: '0.3',
    quantity: '3.5',
    created_at: '2023-01-02T00:00:00Z',
    updated_at: '2023-01-02T00:00:00Z',
  },
  { 
    ingredient_id: 3,
    recipe_id: 101,
    ingredient_name: 'Butter',
    ingredient_cost: '1.2',
    quantity: '2',
    created_at: '2023-01-03T00:00:00Z',
    updated_at: '2023-01-03T00:00:00Z',
  },
];

const ststockMissingIngredients: StockItem[] = [
  { ingredient_id: 1, location_id: 1, quantity: '10' },
  { ingredient_id: 2, location_id: 1, quantity: '2' },
  { ingredient_id: 4, location_id: 1, quantity: '8' },
];

const stockAllIngredients: StockItem[] = [
  { ingredient_id: 1, location_id: 1, quantity: '5' },
  { ingredient_id: 2, location_id: 1, quantity: '4' },
  { ingredient_id: 3, location_id: 1, quantity: '2' },
];

const expectedStockUpdatePayload: StockBatchUpdateRequest = {
  mode: STOCK_MODE.INCREASE,
  data: [
    { ingredientId: 1, locationId: 1, quantity: 5 },
    { ingredientId: 2, locationId: 1, quantity: 3.5 },
    { ingredientId: 3, locationId: 1, quantity: 2 },
  ],
};

describe('getOutOfStockIngredients', () => {
  it('returns ingredients that are out of stock', () => {
    const outOfStock = getOutOfStockIngredients(ingredients, ststockMissingIngredients);

    expect(outOfStock).toHaveLength(2);
    expect(outOfStock[0].ingredient_id).toEqual(2);
    expect(outOfStock[1].ingredient_id).toEqual(3);
  });

  it('returns empty array if all ingredients are in stock', () => {
    const outOfStock = getOutOfStockIngredients(ingredients, stockAllIngredients);

    expect(outOfStock).toEqual([]);
  });

  it('returns all ingredients if stock is empty', () => {
    const outOfStock = getOutOfStockIngredients(ingredients, []);

    expect(outOfStock).toEqual(ingredients);
  });
});

describe('generateStockUpdatePayload', () => {

  it('generates payload with correct quantities for increase mode', () => {
    expectedStockUpdatePayload.mode = STOCK_MODE.INCREASE;

    const result = generateStockUpdatePayload(ingredients, stockAllIngredients, STOCK_MODE.INCREASE);

    expect(result).toEqual(expectedStockUpdatePayload);
  });

  it('generates payload with correct quantities for decrease mode', () => {
    expectedStockUpdatePayload.mode = STOCK_MODE.DECREASE;

    const result = generateStockUpdatePayload(ingredients, stockAllIngredients, STOCK_MODE.DECREASE);

    expect(result).toEqual(expectedStockUpdatePayload);
  });

  it('generates payload with correct quantities for overwrite mode', () => {
    expectedStockUpdatePayload.mode = STOCK_MODE.OVERWRITE;

    const result = generateStockUpdatePayload(ingredients, stockAllIngredients, STOCK_MODE.OVERWRITE);

    expect(result).toEqual(expectedStockUpdatePayload);
  });
});
