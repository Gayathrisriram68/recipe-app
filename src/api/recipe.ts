import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export const fetchCategories = () =>
  axios.get<{ categories: Category[] }>(
    `${BASE_URL}/categories.php`
  );

export const fetchMealByCategory = (cat: string) =>
  axios.get<{ meals: Meal[] }>(
    `${BASE_URL}/filter.php?c=${cat}`
  );

export const fetchMealById = (id: string) =>
  axios.get(
    `${BASE_URL}/lookup.php?i=${id}`
  );

export const searchMeals = (query: string) =>
  axios.get<{ meals: Meal[] }>(
    `${BASE_URL}/search.php?s=${query}`
  );