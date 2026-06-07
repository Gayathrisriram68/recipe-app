import MealCard from "../components/MealCard";
import { useFavorite } from "../context/FavoriteContext";

const Favorites = () => {
  const { favorites } = useFavorite();

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-mauve-600">
        Favorite Meals
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 max-w-6xl mx-auto">
        {favorites.length === 0 ? (
          <p className="text-center text-gray-500 mt-6">
            No favorite meals found
          </p>
        ) : (
          favorites.map((meal) => (
            <MealCard
              key={meal.idMeal}
              meal={meal}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;