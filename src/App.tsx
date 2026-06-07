import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import CategoryMeals from "./pages/CategoryMeals";
import MealDetails from "./pages/MealDetails";
import { FavoriteProvider } from "./context/FavoriteContext";
import Favorites from "./pages/Favorites";
import SearchResults from "./pages/SearchResults";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <FavoriteProvider>
          <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path={`/categories/:category`} element={<CategoryMeals />} />
            <Route path={`/meals/:id`} element={<MealDetails />} />
            <Route path={`/favorites`} element={<Favorites />} />
            <Route path={`/search`} element={<SearchResults />} />
            <Route path="*" element={<h1 className="font-semibold text-6xl text-red-600 text-center mt-40">404 - Page Not Found</h1>} />
          </Routes>
        </main>
        </FavoriteProvider>
      </div>
     </BrowserRouter>
  )
}

export default App;