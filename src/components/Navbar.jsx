
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();


  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/search?q=${search}`);
    }
  };
    const API = import.meta.env.VITE_API_URL;

  const handleLogout = async () => {

    await axios.post(
      `${API}/api/v1/logout`,
      {},
      { withCredentials: true }
    );

    window.location.reload();
  };

  useEffect(() => {

    const getUser = async () => {

      try {

        const res = await axios.get(
          `${API}/api/v1/me`,
          { withCredentials: true }
        );

        setUser(res.data.user);

      } catch (err) {
        setUser(null);
      }

    };

    getUser();

  }, []);


  return (

    <div className="flex justify-between p-4 bg-white shadow">

      <input
        type="text"
        placeholder="Search here..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearch} // 🔥 important
        className="border px-4 py-2 rounded "
      />

      {user ? (

        <div className="flex items-center gap-4">

          <p className="font-semibold">
            {user.name}
          </p>

          {/* Write Blog */}
          <Link to="/write">
            <button className="bg-green-500 text-white px-3 py-1 rounded">
              Write Blog
            </button>
          </Link>

          {/* Admin Button */}
          {user.role === "admin" && (
            <Link to="/admin">
              <button className="bg-black text-white px-3 py-1 rounded">
                Dashboard
              </button>
            </Link>
          )}
          {user.role === "admin" && (
            <Link to="/users">
              <button className="bg-black text-white px-3 py-1 rounded">
                Users
              </button>
            </Link>
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>

        </div>

      ) : (

        <Link
          to="/login"
          className="bg-purple-600 text-white px-5 py-2 rounded-full"
        >
          Sign In
        </Link>

      )}

    </div>

  );

}