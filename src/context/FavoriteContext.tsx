import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";


import type { ReactNode } from "react";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea?: string;
  strCountry?: string;
}

interface FavoriteContextType {
  favorites: Meal[];
  toggleFavorite: (meal: Meal) => void;
  isFavorite: (mealId: string) => boolean;
}

interface FavoriteProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "mealdb_favorites";

const FavoriteContext = createContext<
  FavoriteContextType | undefined
>(undefined);

const loadFavoritesFromStorage = (): Meal[] => {
  try {
    const storedFavorites = localStorage.getItem(STORAGE_KEY);
    return storedFavorites
      ? (JSON.parse(storedFavorites) as Meal[])
      : [];
  } catch (error) {
    console.error("Error loading favorites from storage:", error);
    return [];
  }
};

export const FavoriteProvider = ({
  children,
}: FavoriteProviderProps) => {
  const [favorites, setFavorites] = useState<Meal[]>(
    loadFavoritesFromStorage
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(favorites)
      );
    } catch (error) {
      console.error("Error saving favorites to storage:", error);
    }
  }, [favorites]);

  const toggleFavorite = (meal: Meal): void => {
    setFavorites((prevFavs) => {
      const isFav = prevFavs.some(
        (fav) => fav.idMeal === meal.idMeal
      );

      if (isFav) {
        return prevFavs.filter(
          (fav) => fav.idMeal !== meal.idMeal
        );
      }

      return [...prevFavs, meal];
    });
  };

  const isFavorite = (mealId: string): boolean => {
    return favorites.some(
      (meal) => meal.idMeal === mealId
    );
  };

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = (): FavoriteContextType => {
  const context = useContext(FavoriteContext);

  if (!context) {
    throw new Error(
      "useFavorite must be used within a FavoriteProvider"
    );
  }

  return context;
};