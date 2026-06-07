import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <header className="bg-mauve-600 text-white p-4 shadow">
      <nav className="max-w-6xl mx-auto flex flex-col items-center justify-between sm:flex-row gap-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold">
            Recipe App
          </Link>
          <Link to="/">Categories</Link>
          <Link to="/favorites">Favorites</Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="search-form flex gap-2"
        >
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search for recipes..."
            className="bg-white px-3 py-1 rounded outline-none text-gray-800 w-48 sm:w-64"
          />
          <button
            type="submit"
            className="bg-gray-200 px-3 py-1 rounded text-mauve-800 hover:bg-gray-400"
          >
            Search
          </button>
        </form>
      </nav>
    </header>
  );
};

export default Header;