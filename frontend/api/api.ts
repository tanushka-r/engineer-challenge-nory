import axios from 'axios';
import type { StockBatchUpdateRequest } from '../src/types/types';

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

export async function updateStock(request: StockBatchUpdateRequest) {
  try {
    const response = await axios.put(`${API_HOST}/api/v1/stock`, request);
    return response.data;
  } catch (error) {
    console.error('Error updating stock in batch:', error);
    throw error;
  }
}

