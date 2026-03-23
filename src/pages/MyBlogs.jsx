import { useEffect, useState } from "react";
import axios from "axios";


export default function MyBlogs() {
    const API = import.meta.env.VITE_API_URL;

  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const res = await axios.get(
      `${API}/api/blogs/my`,
      { withCredentials: true }
    );
    setBlogs(res.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(
      `${API}/api/blogs/${id}`,
      { withCredentials: true }
    );
    fetchBlogs();
  };

 
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        My Blogs
      </h2>

      <div className="grid gap-4">

        {blogs.map((b) => (
          <div
            key={b._id}
            className="bg-white p-4 rounded shadow"
          >

            <h3 className="font-bold text-lg">
              {b.title}
            </h3>

            <p className="text-sm text-gray-500">
              Status: {b.isPublished ? "✅ Published" : "⏳ Pending"}
            </p>

            <div className="flex gap-3 mt-3">

              {/* Edit */}
              <button className="text-blue-600">
                Edit
              </button>

              {/* Delete */}
              <button
                onClick={() => handleDelete(b._id)}
                className="text-red-600"
              >
                Delete
              </button>

              {/* Admin Only */}
              {/* {b.isPublished === false && (
                <button
                  onClick={() => handleApprove(b._id)}
                  className="text-green-600"
                >
                  Approve
                </button>
              )} */}

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}