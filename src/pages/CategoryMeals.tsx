import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMealByCategory } from "../api/recipe";
import LoadingSpinner from "../components/LoadingSpinner";
import MealCard from "../components/MealCard";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea?: string;
  strCountry?: string;
}

const CategoryMeals = () => {
  const { category } = useParams<{ category: string }>();

  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!category) return;
     fetchMealByCategory(category)
      .then((res) => setMeals(res.data.meals || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [category]);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <h1 className="text-4xl font-bold text-center mt-6 text-mauve-600">
        Meals in {category}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 max-w-6xl mx-auto">
        {meals.length === 0 ? (
          <p className="text-center text-gray-500 mt-6">
            No meals found in {category}
          </p>
        ) : (
          meals.map((meal) => (
            <MealCard
              key={meal.idMeal}
              meal={meal}
            />
          ))
        )}
      </div>
    </>
  );
};

export default CategoryMeals;