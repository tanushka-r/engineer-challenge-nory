import type { RecipeIngredient, StockItem, StockUpdateItem, StockBatchUpdateRequest, StockUpdateMode  } from '../types/types';

/**
 * Compare ingredient quantities against stock quantities and return those out of stock
 * @param ingredients Array of recipe ingredients with required quantities
 * @param stock Array of stock records with available quantities
 * @returns Array of ingredients where required quantity > available stock quantity
 */
export const getOutOfStockIngredients = (
  ingredients: RecipeIngredient[],
  stock: StockItem[]
): RecipeIngredient[] => {
  const outOfStock: RecipeIngredient[] = [];

  for (const ingredient of ingredients) {
    const stockItem = stock.find(s => s.ingredient_id === ingredient.ingredient_id);

    if (!stockItem) {
      outOfStock.push(ingredient);
      continue;
    }

    const requiredQty = parseFloat(ingredient.quantity);
    const availableQty = parseFloat(stockItem.quantity);

    if (requiredQty > availableQty) {
      outOfStock.push(ingredient);
    }
  }

  return outOfStock;
};


/**
 * Generate stock update object in correct format and assign new quantity and mode
 * @param ingredients Array of recipe ingredients with quantities to update
 * @param stock Array of stock records with available quantities
 * @param mode mode of the db operation on stock - increment, decrement or overwrite
 * @returns Oject containing payload and mode of operation
 */
export const generateStockUpdatePayload = (
  ingredients: RecipeIngredient[],
  stock: StockItem[],
  mode: StockUpdateMode
): StockBatchUpdateRequest => {
  const data = stock.map((stockItem) => {
    const ingredient = ingredients.find(ing => ing.ingredient_id === stockItem.ingredient_id);

    return {
      ingredientId: stockItem.ingredient_id,
      locationId: stockItem.location_id,
      quantity: parseFloat(ingredient!.quantity),
    };
  });

  return {
    mode,
    data,
  };
};
