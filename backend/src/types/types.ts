export type StockUpdateMode = "increase" | "decrease" | "overwrite";

export interface StockUpdateItem {
  ingredientId: number;
  locationId: number;
  quantity: number;
}

export interface StockBatchUpdateRequest {
  mode: StockUpdateMode;
  data: StockUpdateItem[];
}
