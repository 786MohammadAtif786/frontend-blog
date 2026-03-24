
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logImg from '../assets/logo.png'

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


  <div className="bg-white shadow p-3">

    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

      {/* 🔥 Left Side (Logo + Home) */}
      <div className="flex items-center justify-between w-full md:w-auto">


         <Link to="/" className="flex items-center gap-2 mb-6">
         
                 <img
                   src={logImg}
                   alt="DevNotes Logo"
                   className="w-8 h-8 object-contain"
                 />
         
                 <h1 className="text-xl font-bold">
                   <span className="text-green-500">Dev</span>
                   <span className="text-blue-600">Notes</span>
                 </h1>
         
               </Link>

      </div>

      {/* 🔥 Search */}
      <input
        type="text"
        placeholder="Search here..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearch}
        className="w-full md:w-1/3 border px-4 py-2 rounded"
      />

      {/* 🔥 Right Side */}
      {user ? (
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">

          <p className="font-semibold text-sm">
            {user.name}
          </p>

          <Link to="/write">
            <button className="bg-green-500 text-white px-3 py-1 rounded text-sm">
              Write
            </button>
          </Link>

          {user.role === "admin" && (
            <>
              <Link to="/admin" className="hidden md:block">
                <button className="bg-black text-white px-3 py-1 rounded text-sm">
                  Dashboard
                </button>
              </Link>

              <Link to="/users" className="hidden md:block">
                <button className="bg-black text-white px-3 py-1 rounded text-sm">
                  Users
                </button>
              </Link>
            </>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm"
          >
            Logout
          </button>

        </div>
      ) : (
        <Link
          to="/login"
          className="bg-purple-600 text-white px-4 py-2 rounded-full text-center"
        >
          Sign In
        </Link>
      )}

    </div>

  </div>


  );

}