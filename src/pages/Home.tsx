import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import LoadingSpinner from "../components/LoadingSpinner";
import { fetchCategories } from "../api/recipe";

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCategories()
      .then((res) => setCategories(res.data.categories))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto p-3">
      <div className="text-center mb-10 mt-3">
        <h1 className="text-2xl sm:text-3xl text-mauve-600 font-semibold tracking-widest">
          Browse Meal Categories
        </h1>

        <p className="mt-3 text-lg text-gray-500 font-semibold">
          Discover delicious recipes around the world!
        </p>
      </div>

      <div className="mt-4 flex justify-center">
        <div className="h-1 w-24 bg-mauve-600 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {categories.map((cat) => (
          <Link
            key={cat.idCategory}
            to={`/categories/${cat.strCategory}`}
            className="bg-mauve-100 rounded shadow hover:shadow-2xl transition p-4 cursor-pointer"
          >
            <img
              src={cat.strCategoryThumb}
              alt={cat.strCategory}
              className="w-full h-40 object-cover rounded"
            />

            <h2 className="text-xl font-bold mt-4 text-center text-mauve-600">
              {cat.strCategory}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;