import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMeals } from "../api/recipe";
import LoadingSpinner from "../components/LoadingSpinner";
import MealCard from "../components/MealCard";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea?: string;
  strCountry?: string;
}

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);

        if (!query) {
          setMeals([]);
          return;
        }

        const res = await searchMeals(query);
        setMeals(res.data.meals || []);
      } catch (error) {
        console.error(error);
        setMeals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4 text-mauve-600 font-semibold">
        <LoadingSpinner />
      </div>
    );
  }

  if (meals.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-4 text-mauve-600 font-semibold">
        No results found for "{query}"
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-mauve-600 mb-4">
        Search Results for "{query}"
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 max-w-6xl mx-auto">
        {meals.map((meal) => (
          <MealCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;