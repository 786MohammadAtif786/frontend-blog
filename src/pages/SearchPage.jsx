import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SearchPage() {

  const [blogs, setBlogs] = useState([]);

  const query = new URLSearchParams(useLocation().search);
  const search = query.get("q");

  useEffect(() => {

    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/blogs/search?q=${search}`
      );

      setBlogs(res.data.blogs);
    };

    if (search) fetchData();

  }, [search]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        Results for "{search}"
      </h2>

      <div className="grid grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <div key={blog._id}>
            <h3>{blog.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}