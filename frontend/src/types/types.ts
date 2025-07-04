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
