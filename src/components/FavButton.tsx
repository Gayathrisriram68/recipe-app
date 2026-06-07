interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea?: string;
  strCountry?: string;
}

interface FavButtonProps {
  meal: Meal;
  isFavorite: boolean;
  onToggle: (meal: Meal) => void;
}

const FavButton = ({
  meal,
  isFavorite,
  onToggle,
}: FavButtonProps) => {
  return (
    <div className="flex place-content-end">
      <button
        onClick={() => onToggle(meal)}
        className={`cursor-pointer rounded-full text-xl p-2 ${
          isFavorite ? "bg-red-500" : "bg-white"
        }`}
      >
        🤍
      </button>
    </div>
  );
};

export default FavButton;