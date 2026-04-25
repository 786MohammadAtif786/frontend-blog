
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import logImg from "../assets/logo.png";

// export default function Navbar() {
//   const [user, setUser] = useState(null);
//   const [search, setSearch] = useState("");
//   const [open, setOpen] = useState(false);
//   const [authLoading, setAuthLoading] = useState(true);

//   const navigate = useNavigate();
//   const API = import.meta.env.VITE_API_URL;

//   // 🔍 Search
//   const handleSearch = (e) => {
//     if (e.key === "Enter" && search.trim()) {
//       navigate(`/search?q=${search}`);
//     }
//   };

//   // 🚪 Logout
//   const handleLogout = async () => {
//     try {
//       await axios.post(
//         `${API}/api/v1/logout`,
//         {},
//         { withCredentials: true }
//       );
//       window.location.reload();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // 👤 Get user
//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const res = await axios.get(
//           `${API}/api/v1/me`,
//           { withCredentials: true }
//         );
//         setUser(res.data.user);
//       } catch {
//         setUser(null);
//       } finally {
//         setAuthLoading(false); // 🔥 flicker fix
//       }
//     };

//     getUser();
//   }, []);

//   // ❌ Close dropdown on outside click
//   useEffect(() => {
//     const handleClick = () => setOpen(false);
//     window.addEventListener("click", handleClick);
//     return () => window.removeEventListener("click", handleClick);
//   }, []);

//   return (
//     <div className="w-full bg-gray-100 shadow px-6 py-3 rounded-md">
//       <div className="flex items-center justify-between">

//         {/* 🔥 Logo */}
//         <Link to="/" className="flex items-center gap-2">
//           <img src={logImg} alt="logo" className="w-8 h-8" />
//           <h1 className="text-xl font-bold">
//             <span className="text-green-500">Dev</span>
//             <span className="text-cyan-600">Notes</span>
//           </h1>
//         </Link>

//         {/* 🔍 Search */}
//         <input
//           type="text"
//           placeholder="Search..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           onKeyDown={handleSearch}
//           className="hidden md:block w-1/3 border px-4 py-2 rounded-3xl border-cyan-500"
//         />

//         {/* 🔥 Right Side */}
//         <p className="font-semibold text-gray-700">
//             {user.name}
//         </p>
//         {authLoading ? (
//           // 🔄 Spinner
//           <div className="w-10 h-10 flex items-center justify-center">
//             <div className="w-5 h-5 border-2 border-cyan-800 border-t-transparent rounded-full animate-spin"></div>
//           </div>
          
//         ) : user ? (
//           <div className="relative">
            
//             {/* 👤 Avatar */}
//             <div
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setOpen(!open);
//               }}
//               className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center cursor-pointer font-bold"
//             >
//               {user.name?.charAt(0).toUpperCase()}
//             </div>

//             {/* 🔽 Dropdown */}
//             {open && (
//               <div
//                 onClick={(e) => e.stopPropagation()}
//                 className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 animate-fadeIn z-50"
//               >

//                 {/* <Link to="/write" className="block px-4 py-2 hover:bg-gray-100">
//                   ✍️ Create Blog
//                 </Link>
//                  <Link to="/my-blogs" className="block px-4 py-2 hover:bg-gray-100">
//                     📚 My Blog
//                 </Link> */}

//                 {user.role !== "admin" && (
//                     <>
//                       <Link
//                         to="/write"
//                         className="block px-4 py-2 hover:bg-gray-100"
//                       >
//                         ✍️ Create Blog
//                       </Link>

//                       <Link
//                         to="/my-blogs"
//                         className="block px-4 py-2 hover:bg-gray-100"
//                       >
//                         📚 My Blogs
//                       </Link>
//                     </>
//                   )}

//                 {user.role === "admin" && (
//                   <>
//                     <Link to="/admin" className="block px-4 py-2 hover:bg-gray-100">
//                       📊 Dashboard
//                     </Link>

//                     <Link to="/users" className="block px-4 py-2 hover:bg-gray-100">
//                       👥 Users
//                     </Link>
//                   </>
//                 )}

//                 <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
//                   ⚙️ Settings
//                 </button>

//                 <button
//                   onClick={handleLogout}
//                   className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-100"
//                 >
//                   🚪 Logout
//                 </button>

//               </div>
//             )}

//           </div>
//         ) : (
//           <Link
//             to="/login"
//             className="bg-[#157A9E] hover:bg-[#136b89] text-white px-4 py-2 rounded-full"
//           >
//             Sign In
//           </Link>
//         )}

//       </div>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import logImg from "../assets/logo.png";

// export default function Navbar() {
//   const [user, setUser] = useState(null);
//   const [search, setSearch] = useState("");
//   const [open, setOpen] = useState(false);
//   const [authLoading, setAuthLoading] = useState(true);

//   const navigate = useNavigate();
//   const API = import.meta.env.VITE_API_URL;

//   // 🔍 Search
//   const handleSearch = (e) => {
//     if (e.key === "Enter" && search.trim()) {
//       navigate(`/search?q=${search}`);
//     }
//   };

//   // 🚪 Logout
//   const handleLogout = async () => {
//     try {
//       await axios.post(
//         `${API}/api/v1/logout`,
//         {},
//         { withCredentials: true }
//       );
//       window.location.reload();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // 👤 Get user
//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const res = await axios.get(
//           `${API}/api/v1/me`,
//           { withCredentials: true }
//         );
//         setUser(res.data.user);
//       } catch {
//         setUser(null);
//       } finally {
//         setAuthLoading(false);
//       }
//     };

//     getUser();
//   }, []);

//   // ❌ Outside click close
//   useEffect(() => {
//     const handleClick = () => setOpen(false);
//     window.addEventListener("click", handleClick);
//     return () => window.removeEventListener("click", handleClick);
//   }, []);

//   return (
//     <div className="w-full bg-gray-100 shadow px-6 py-3">
//       <div className="flex items-center justify-between">

//         {/* 🔥 Logo */}
//         <Link to="/" className="flex items-center gap-2">
//           <img src={logImg} alt="logo" className="w-8 h-8" />
//           <h1 className="text-xl font-bold">
//             <span className="text-green-500">Dev</span>
//             <span className="text-cyan-600">Notes</span>
//           </h1>
//         </Link>

//         {/* 🔍 Search */}
//         <input
//           type="text"
//           placeholder="Search..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           onKeyDown={handleSearch}
//           className="hidden md:block w-1/3 border px-4 py-2 rounded-3xl border-cyan-500"
//         />

//         {/* 🔥 Right Side */}
//         {authLoading ? (
//           <div className="w-10 h-10 flex items-center justify-center">
//             <div className="w-5 h-5 border-2 border-cyan-800 border-t-transparent rounded-full animate-spin"></div>
//           </div>
//         ) : user ? (

//           <div className="relative flex items-center gap-3">

//             {/* 👤 Avatar */}
//              {/* 🧑 Name */}
//             <span className="hidden md:block font-medium text-gray-700 capitalize">
//               {user.name}
//             </span>

//             <div
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setOpen(!open);
//               }}
//               className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center cursor-pointer font-bold"
//             >
//               {user.name?.charAt(0).toUpperCase()}
//             </div>

           
//             {/* 🔽 Dropdown */}
//             {open && (
//               <div
//                 onClick={(e) => e.stopPropagation()}
//                 className="absolute right-0 top-12 w-48 bg-white shadow-lg rounded-lg py-2 animate-fadeIn z-50"
//               >

//                 {/* 👤 User Only */}
//                 {user.role !== "admin" && (
//                   <>
//                     <Link to="/write" className="block px-4 py-2 hover:bg-gray-100">
//                       ✍️ Create Blog
//                     </Link>

//                     <Link to="/my-blogs" className="block px-4 py-2 hover:bg-gray-100">
//                       📚 My Blogs
//                     </Link>
//                   </>
//                 )}

//                 {/* 👑 Admin */}
//                 {user.role === "admin" && (
//                   <>
//                     <Link to="/admin" className="block px-4 py-2 hover:bg-gray-100">
//                       📊 Dashboard
//                     </Link>

//                     <Link to="/users" className="block px-4 py-2 hover:bg-gray-100">
//                       👥 Users
//                     </Link>
//                   </>
//                 )}
//                 <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">

//                   ⚙️ Settings
   
//                 </Link>

//                 <button
//                   onClick={handleLogout}
//                   className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-100"
//                 >
//                   🚪 Logout
//                 </button>

//               </div>
//             )}

//           </div>

//         ) : (
//           <Link
//             to="/login"
//             className="bg-[#157A9E] hover:bg-[#136b89] text-white px-4 py-2 rounded-full"
//           >
//             Sign In
//           </Link>
//         )}

//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logImg from "../assets/logo.png";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  // 🔍 Search
  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/search?q=${search}`);
    }
  };

  // 🚪 Logout
  const handleLogout = async () => {
    try {
      await axios.post(
        `${API}/api/v1/logout`,
        {},
        { withCredentials: true }
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // 👤 Get user
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `${API}/api/v1/me`,
          { withCredentials: true }
        );
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    getUser();
  }, []);

  // ❌ Outside click close
  useEffect(() => {
    const handleClick = () => setOpen(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="w-full bg-gray-100 shadow px-6 py-3">
      <div className="flex items-center justify-between">

        {/* 🔥 Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <img src={logImg} alt="logo" className="w-8 h-8" />
          <h1 className="text-xl font-bold">
            <span className="text-green-500">Dev</span>
            <span className="text-cyan-600">Notes</span>
          </h1>
        </Link>

        {/* 🔍 Search */}
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
          className="hidden md:block w-1/3 border px-4 py-2 rounded-3xl border-cyan-500 focus:outline-none"
        />

        {/* 🔥 Right Side */}
        {authLoading ? (
          <div className="w-10 h-10 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-cyan-800 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : user ? (

          <div className="relative flex items-center gap-3">

            {/* 👤 Avatar */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setOpen(!open);
              }}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center cursor-pointer font-bold"
            >
              {user.name?.charAt(0).toUpperCase()}
            </div>

            {/* 🧑 Name */}
            <span className="hidden md:block font-medium text-gray-700 capitalize">
              {user.name}
            </span>

            {/* 🔽 Dropdown */}
            {open && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 top-12 w-52 bg-white shadow-lg rounded-xl py-2 z-50"
              >

                {/* 👤 User Only */}
                {user.role !== "admin" && (
                  <>
                    <Link
                      to="/write"
                      className="block px-4 py-2 text-gray-700 no-underline hover:bg-gray-100 rounded-md transition"
                    >
                      ✍️ Create Blog
                    </Link>

                    <Link
                      to="/my-blogs"
                      className="block px-4 py-2 text-gray-700 no-underline hover:bg-gray-100 rounded-md transition"
                    >
                      📚 My Blogs
                    </Link>
                  </>
                )}

                {/* 👑 Admin */}
                {user.role === "admin" && (
                  <>
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-gray-700 no-underline hover:bg-gray-100 rounded-md transition"
                    >
                      📊 Dashboard
                    </Link>

                    <Link
                      to="/users"
                      className="block px-4 py-2 text-gray-700 no-underline hover:bg-gray-100 rounded-md transition"
                    >
                      👥 Users
                    </Link>
                  </>
                )}

                {/* ⚙️ Settings */}
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-gray-700 no-underline hover:bg-gray-100 rounded-md transition"
                >
                  ⚙️ Settings
                </Link>

                {/* Divider */}
                <div className="border-t my-2"></div>

                {/* 🚪 Logout */}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-100 rounded-md transition"
                >
                  🚪 Logout
                </button>

              </div>
            )}

          </div>

        ) : (
          <Link
            to="/login"
            className="bg-[#157A9E] hover:bg-[#136b89] text-white px-4 py-2 rounded-full no-underline"
          >
            Sign In
          </Link>
        )}

      </div>
    </div>
  );
}