export const STOCK_MODE = {
  INCREASE: 'increase',
  DECREASE: 'decrease',
  OVERWRITE: 'overwrite',
} as const;

export type StockUpdateMode = typeof STOCK_MODE[keyof typeof STOCK_MODE];

export interface StockUpdateItem {
  ingredientId: number;
  locationId: number;
  quantity: number;
}

export interface StockBatchUpdateRequest {
  mode: StockUpdateMode;
  data: StockUpdateItem[];
}

export interface RecipeIngredient {
  recipe_id: number;
  ingredient_id: number;
  quantity: string; 
  ingredient_name: string;
  ingredient_cost: string;
  created_at: string; 
  updated_at: string;
}

export interface StockItem {
  ingredient_id: number;
  location_id: number;
  quantity: string; 
}

export type StockItemForLocation = {
  ingredient_id: number;
  location_id: number;
  quantity: string;
  ingredient_name: string;
  unit_name: string;
  location_name: string;
  created_at: string;
  updated_at: string;
};

export interface MenuItem {
  location_id: number;
  modifier_id: number;
  price: string;
  recipe_id: number;
  recipe_name: string;
  created_at: string;
  updated_at: string;
}

export interface SaleSummary {
  id: number;
  name: string;
  quantity?: number;
  price?: number;
  total: number;
}

export interface Ingredient {
  id: number;
  name: string;
  cost: string;
  unit_id: number;
  created_at: string;
  updated_at: string;
}

export interface DeliverySummary {
  id: number;
  name: string;
  quantity?: number;
  cost?: number;
  total: number;
}
