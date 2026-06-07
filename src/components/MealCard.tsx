import { Link } from "react-router-dom";
import FavButton from "./FavButton";
import { useFavorite } from "../context/FavoriteContext";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea?: string;
  strCountry?: string;
}

interface MealCardProps {
  meal: Meal;
}

const MealCard = ({ meal }: MealCardProps) => {
  const { toggleFavorite, isFavorite } = useFavorite();

  return (
    <div
      className="bg-mauve-100 rounded shadow hover:shadow-2xl transition p-4 cursor-pointer"
      title={meal.strMeal}
    >
      <FavButton
        meal={meal}
        isFavorite={isFavorite(meal.idMeal)}
        onToggle={toggleFavorite}
      />

      <Link to={`/meals/${meal.idMeal}`}>
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-40 object-cover rounded mt-4"
        />
        <h2 className="text-xl font-bold mt-4 text-center text-mauve-600">
          {meal.strMeal}
        </h2>
      </Link>
    </div>
  );
};

export default MealCard;