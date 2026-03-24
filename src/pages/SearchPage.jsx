import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/Loading.jsx";
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
          // `${API}/api/v1/search?q=${search}` //
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
  if(loading) {
    return <Loading />
  }
  return (
    <div className="p-4 lg:p-6">

      <h2 className="text-xl font-bold mb-4">
        Results for "{search}"
      </h2>



         {!loading && blogs.length === 0 && (
      <p className="text-gray-500">No results found 😔</p>
    )}

      {/* 🔥 Results */}
   
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <Link
            to={`/blog/${blog._id}`} // 🔥 route to single blog
            key={blog._id}
            className="block"
          >
            <div className="bg-white p-4 rounded shadow hover:shadow-md transition cursor-pointer">

              <h3 className="font-semibold">
                {blog.title}
              </h3>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}