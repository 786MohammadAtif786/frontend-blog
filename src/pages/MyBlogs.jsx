// import { useEffect, useState } from "react";
// import axios from "axios";


// export default function MyBlogs() {
//     const API = import.meta.env.VITE_API_URL;

//   const [blogs, setBlogs] = useState([]);

//   const fetchBlogs = async () => {
//     const res = await axios.get(
//       `${API}/api/blogs/my`,
//       { withCredentials: true }
//     );
//     setBlogs(res.data);
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const handleDelete = async (id) => {
//     await axios.delete(
//       `${API}/api/blogs/${id}`,
//       { withCredentials: true }
//     );
//     fetchBlogs();
//   };

 
//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">
//         My Blogs
//       </h2>

//       <div className="grid gap-4">

//         {blogs.map((b) => (
//           <div
//             key={b._id}
//             className="bg-white p-4 rounded shadow"
//           >

//             <h3 className="font-bold text-lg">
//               {b.title}
//             </h3>

//             <p className="text-sm text-gray-500">
//               Status: {b.isPublished ? "✅ Published" : "⏳ Pending"}
//             </p>

//             <div className="flex gap-3 mt-3">

//               {/* Edit */}
//               <button className="text-blue-600">
//                 Edit
//               </button>

//               {/* Delete */}
//               <button
//                 onClick={() => handleDelete(b._id)}
//                 className="text-red-600"
//               >
//                 Delete
//               </button>

//               {/* Admin Only */}
//               {/* {b.isPublished === false && (
//                 <button
//                   onClick={() => handleApprove(b._id)}
//                   className="text-green-600"
//                 >
//                   Approve
//                 </button>
//               )} */}

//             </div>

//           </div>
//         ))}

//       </div>

//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MyBlogs() {
  const API = import.meta.env.VITE_API_URL;

  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(
        `${API}/api/blogs/my`,
        { withCredentials: true }
      );
      setBlogs(res.data);
    } catch (err) {
      console.log(err);
    }
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
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* 🔙 Back Button */}
      <Link
        to="/"
        className="inline-block mb-6 text-cyan-700 font-semibold hover:underline"
      >
        ← Back to Home
      </Link>

      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        📖 My Blogs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {blogs.map((b) => (

          <div
            key={b._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >

            {/* 🖼️ Image */}
            <img
              src={b.image}
              alt={b.title}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">

              {/* Title */}
              <h3 className="font-bold text-lg mb-2 line-clamp-2">
                {b.title}
              </h3>

              {/* Status */}
              <p className="text-sm mb-3">
                {b.isPublished ? (
                  <span className="text-green-600">✅ Published</span>
                ) : (
                  <span className="text-yellow-600">⏳ Pending</span>
                )}
              </p>

              {/* Actions */}
              <div className="flex justify-between items-center">

                {/* 👁️ View */}
                <Link
                  to={`/blog/${b._id}`}
                  className="text-cyan-700 font-medium hover:underline"
                >
                  View
                </Link>

                {/* ✏️ Edit */}
                <button className="text-blue-600">
                  Edit
                </button>

                {/* 🗑️ Delete */}
                <button
                  onClick={() => handleDelete(b._id)}
                  className="text-red-600"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}