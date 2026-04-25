import axios from 'axios';

const BASE = 'https://api.spoonacular.com';
const KEY = process.env.SPOONACULAR_API_KEY;

export async function searchRecipe(query: string) {
  const res = await axios.get(`${BASE}/recipes/complexSearch`, {
    params: {
      apiKey: KEY,
      query,
      number: 1,
      addRecipeInformation: true,
      addRecipeNutrition: true,
      fillIngredients: true,
    },
  });
  return res.data.results[0] ?? null;
}

export async function getRecipeById(id: number) {
  const res = await axios.get(`${BASE}/recipes/${id}/information`, {
    params: { apiKey: KEY, includeNutrition: true },
  });
  return res.data;
}

export async function getRecipeNutrition(id: number) {
  const res = await axios.get(`${BASE}/recipes/${id}/nutritionWidget.json`, {
    params: { apiKey: KEY },
  });
  return res.data;
}