import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFavorite } from "../context/FavoriteContext";
import { fetchMealById } from "../api/recipe";
import LoadingSpinner from "../components/LoadingSpinner";
import FavButton from "../components/FavButton";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions?: string;
  strYoutube?: string;

  [key: string]: string | undefined;
}

const MealDetails = () => {
  const { id } = useParams<{ id: string }>();

  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { toggleFavorite, isFavorite } = useFavorite();

  useEffect(() => {
    if (!id) return;

    const getMeal = async () => {
      try {
        setLoading(true);

        const res = await fetchMealById(id);

        setMeal(res.data.meals?.[0] ?? null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getMeal();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!meal) {
    return (
      <div className="max-w-6xl mx-auto p-4 text-mauve-600 font-semibold">
        Meal not found
      </div>
    );
  }

  const ingredients: string[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient?.trim()) {
      ingredients.push(`${measure ?? ""} ${ingredient}`);
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center text-mauve-600">
        {meal.strMeal}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="w-half h-auto rounded-lg shadow-md mt-4">
          <FavButton
            meal={meal}
            onToggle={toggleFavorite}
            isFavorite={isFavorite(meal.idMeal)}
          />

          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-auto rounded-lg shadow-md mt-4"
          />

          {meal.strYoutube && (
            <div className="mt-4 text-right">
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-mauve-700 transition-colors duration-200 text-center"
              >
                Watch Video
              </a>
            </div>
          )}
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-mauve-600">
            Ingredients
          </h2>

          <ul className="list-disc list-inside mt-2">
            {ingredients.map((ingredient, index) => (
              <li
                key={index}
                className="text-gray-700"
              >
                {ingredient}
              </li>
            ))}
          </ul>

          {meal.strInstructions && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-mauve-600">
                Instructions
              </h2>

              <p className="text-gray-700 mt-2">
                {meal.strInstructions}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealDetails;