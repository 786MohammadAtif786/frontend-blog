// import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function SearchPage() {

//   const [blogs, setBlogs] = useState([]);

//   const query = new URLSearchParams(useLocation().search);
//   const search = query.get("q");
//   const API = import.meta.env.VITE_API_URL;

//   useEffect(() => {

//     const fetchData = async () => {
//       const res = await axios.get(
//         // `http://localhost:3000/api/blogs/search?q=${search}`
//         `${API}/api/blogs/search?q=${search}`
//       );

//       setBlogs(res.data.blogs);
//     };

//     if (search) fetchData();

//   }, [search]);

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">
//         Results for "{search}"
//       </h2>

//       <div className="grid grid-cols-3 gap-4">
//         {blogs.map((blog) => (
//           <div key={blog._id}>
//             <h3>{blog.title}</h3>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SearchPage() {

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const query = new URLSearchParams(useLocation().search);
  const search = query.get("q");

  const API = import.meta.env.VITE_API_URL;
  console.log(API);
  
  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          // `${API}/api/v1/search?q=${search}` // 🔥 fix route
          `${API}/api/blogs/search?q=${search}`
        );

        setBlogs(res.data.blogs);

      } catch (err) {
        console.log("Search error", err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    if (search) fetchData();

  }, [search]);

  return (
    <div className="p-4 lg:p-6">

      <h2 className="text-xl font-bold mb-4">
        Results for "{search}"
      </h2>

      {/* 🔥 Loading */}
      {loading && (
        <p className="text-gray-500">Loading...</p>
      )}

      {/* 🔥 No results */}
      {!loading && blogs.length === 0 && (
        <p className="text-gray-500">No results found 😔</p>
      )}

      {/* 🔥 Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white p-4 rounded shadow hover:shadow-md transition"
          >
            <h3 className="font-semibold">
              {blog.title}
            </h3>
          </div>
        ))}
      </div>

    </div>
  );
}