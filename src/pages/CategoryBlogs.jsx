

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function CategoryBlogs() {

  const { category } = useParams();
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
      const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axios.get(
        `${API}/api/blogs/category/${category}`
      );
      setBlogs(res.data);
    };

    fetchBlogs();
  }, [category]);

  return (
    <div className="p-6 md:p-10">

      {/* 🔥 Dynamic Heading */}
      <h2 className="text-3xl font-bold mb-8 capitalize">
        {decodeURIComponent(category)} Blogs
      </h2>

      {/* 🔥 Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {blogs.map((b) => (

          <div
            key={b._id}
            onClick={() => navigate(`/blog/${b._id}`)}
            className="bg-white rounded-xl shadow-md hover:shadow-xl cursor-pointer overflow-hidden transition duration-300"
          >

            {/* Image */}
            <img
              src={b.image}
              alt="blog"
              className="w-full h-44 object-cover"
            />

            {/* Content */}
            <div className="p-5">

              <p className="text-xs text-gray-400 mb-1">
                {new Date(b.createdAt).toDateString()}
              </p>

              <h3 className="font-semibold text-lg leading-snug line-clamp-2">
                {b.title}
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                by {b.author?.name}
              </p>

            </div>

          </div>

        ))}

      </div>

      {/* ❗ Empty State */}
      {blogs.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No blogs found 😢
        </p>
      )}

    </div>
  );
}