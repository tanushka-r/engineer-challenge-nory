import axios from 'axios';

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
