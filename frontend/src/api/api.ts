import axios from 'axios';
import type { StockBatchUpdateRequest, RecipeIngredient, StockItem, StockUpdateItem } from '../types/types';
import { getOutOfStockIngredients } from '../lib/utils';

const API_HOST = import.meta.env.VITE_API_HOST;

export async function fetchIngredients() {
  try {
    const response = await axios.get(`${API_HOST}/api/v1/ingredients`);
    return response.data;
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    throw error;
  }
}

export async function fetchLocation(id: number) {
  try {
    const response = await axios.get(`${API_HOST}/api/v1/locations/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching location:', error);
    throw error;
  }
}

export async function fetchStaffMember(id: number) {
  try {
    const response = await axios.get(`${API_HOST}/api/v1/staff/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching staff member:', error);
    throw error;
  }
}

export async function fetchMenus(locationId: number) {
  try {
    const response = await axios.get(`${API_HOST}/api/v1/menu/location/${locationId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching menu for location ${locationId}:`, error);
    throw error;
  }
}

export async function processDelivery(deliveryData: {
  ingredientId: number;
  quantity: string;
  cost: string;
  staffId: number;
  locationId: number;
}) {
  try {
    const response = await axios.post(`${API_HOST}/api/v1/deliveries`, deliveryData);
    return response.data;
  } catch (error) {
    console.error('Error processing delivery:', error);
    throw error;
  }
}

export async function processSale(saleData: {
  recipeId: number;
  quantity: string;
  cost: string;
  staffId: number;
  locationId: number;
}) {
  try {
    const response = await axios.post(`${API_HOST}/api/v1/sales`, saleData);
    return response.data;
  } catch (error) {
    console.error('Error processing sale:', error);
    throw error;
  }
}

export const fetchAllStockForLocation = async (locationId: number) => {
  try {
    const response = await axios.get(`${API_HOST}/api/v1/stock/location/${locationId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all stock for location:', error);
    throw error;
  }
};

export async function updateStock(request: StockBatchUpdateRequest) {
  try {
    const response = await axios.put(`${API_HOST}/api/v1/stock`, request);
    return response.data;
  } catch (error) {
    console.error('Error updating stock in batch:', error);
    throw error;
  }
}

export const fetchRecipeIngredients = async (recipeId: number) => {
  try {
    const response = await axios.get(`${API_HOST}/api/v1/recipe-ingredient/${recipeId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting recipe ingredients:', error);
    throw error;
  }
};

export const fetchStockByIngredients = async (ingredientIds: number[], locationId: number | null) => {
  if (ingredientIds.length === 0) return [];

  const query = ingredientIds.join(',');

  try {
    const response = await axios.get(
      `${API_HOST}/api/v1/stock/location/${locationId}/ingredients?ingredientIds=${query}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching stock by ingredient and location:', error);
    throw error;
  }
};

export const checkStockForRecipe = async (
  recipeId: number,
  locationId: number | null
): Promise<{
  ingredients: RecipeIngredient[];
  stock: StockItem[];
  outOfStock: RecipeIngredient[];
}> => {
  const ingredients = await fetchRecipeIngredients(recipeId);

  const ingredientIds = ingredients.map((item: RecipeIngredient) => item.ingredient_id);

  const stock = await fetchStockByIngredients(ingredientIds, locationId);

  const outOfStock = getOutOfStockIngredients(ingredients, stock);

  return { ingredients, stock, outOfStock };
};

export const recordWaste = async (item: StockUpdateItem) => {

  console.log('Recording waste:', item);
  // TODO: when API is ready, add the call
};
