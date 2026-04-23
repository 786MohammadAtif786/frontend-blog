
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// export default function AdminDashboard() {
//   const [blogs, setBlogs] = useState([]);
//     const API = import.meta.env.VITE_API_URL;
//   console.log("Hello");
  
//   useEffect(() => {
//     const fetchBlogs = async () => {
//       const res = await axios.get(
//         `${API}/api/blogs/admin`,
//         { withCredentials: true }
//       );
//       setBlogs(res.data);
//     };
//     fetchBlogs();
//   }, []);

//   const publishBlog = async (id) => {
//     await axios.put(
//       `${API}/api/blogs/publish/${id}`,
//       {},
//       { withCredentials: true }
//     );

//     setBlogs((prev) =>
//       prev.map((b) => (b._id === id ? { ...b, isPublished: true } : b))
//     );
//   };

//   const deleteBlog = async (id) => {
//     await axios.delete(
//       `${API}/api/blogs/${id}`,
//       { withCredentials: true }
//     );

//     setBlogs((prev) => prev.filter((b) => b._id !== id));
//   };

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">

//       <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

//         {blogs.map((blog) => (

//           <div
//             key={blog._id}
//             className="bg-white shadow rounded-xl overflow-hidden"
//           >

//             <img
//               src={blog.image}
//               className="w-full h-40 object-cover"
//             />

//             <div className="p-4">

//               <h2 className="font-semibold text-lg">
//                 {blog.title}
//               </h2>

//               <p className="text-sm text-gray-500 mb-2">
//                 {blog.author?.name} • {new Date(blog.createdAt).toDateString()}
//               </p>

//               <span
//                 className={`text-sm font-semibold ${
//                   blog.isPublished
//                     ? "text-green-600"
//                     : "text-yellow-600"
//                 }`}
//               >
//                 {blog.isPublished ? "Published" : "Draft"}
//               </span>

//               <div className="flex gap-2 mt-4">

//                 <Link
//                   to={`/admin/blog/${blog._id}`}
//                   className="bg-blue-500 text-white px-3 py-1 rounded"
//                 >
//                   Preview
//                 </Link>

//                 {!blog.isPublished && (
//                   <button
//                     onClick={() => publishBlog(blog._id)}
//                     className="bg-green-500 text-white px-3 py-1 rounded"
//                   >
//                     Publish
//                   </button>
//                 )}

//                 <button
//                   onClick={() => deleteBlog(blog._id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded"
//                 >
//                   Delete
//                 </button>

//               </div>

//             </div>

//           </div>

//         ))}

//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";

// export default function AdminDashboard() {
//   const [blogs, setBlogs] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);

//   const API = import.meta.env.VITE_API_URL;

//   const blogsPerPage = 6;

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       const res = await axios.get(
//         `${API}/api/blogs/admin`,
//         { withCredentials: true }
//       );
//       setBlogs(res.data);
//     };
//     fetchBlogs();
//   }, []);

//   // 🔢 Pagination logic
//   const indexOfLast = currentPage * blogsPerPage;
//   const indexOfFirst = indexOfLast - blogsPerPage;
//   const currentBlogs = blogs.slice(indexOfFirst, indexOfLast);

//   const totalPages = Math.ceil(blogs.length / blogsPerPage);

//   const publishBlog = async (id) => {
//     await axios.put(
//       `${API}/api/blogs/publish/${id}`,
//       {},
//       { withCredentials: true }
//     );

//     setBlogs((prev) =>
//       prev.map((b) => (b._id === id ? { ...b, isPublished: true } : b))
//     );
//   };

//   const deleteBlog = async (id) => {
//     await axios.delete(
//       `${API}/api/blogs/${id}`,
//       { withCredentials: true }
//     );

//     setBlogs((prev) => prev.filter((b) => b._id !== id));
//   };

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">


// <div className="bg-gray-100 min-h-screen">

  
//   <div className="bg-white shadow mb-6">
//     <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

//       <h1 className="text-xl font-bold text-purple-600">
//         Admin Dashboard
//       </h1>

//       <div className="flex gap-3">

//         <Link to="/" className="bg-gray-200 px-4 py-2 rounded">
//           🏠 Home
//         </Link>

//         <Link to="/blogs" className="bg-purple-500 text-white px-4 py-2 rounded">
//           Blogs
//         </Link>

//       </div>

//     </div>
//   </div>

// </div>

//       {/* <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1> */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

//         {currentBlogs.map((blog) => (
//           <div
//             key={blog._id}
//             className="bg-white shadow rounded-xl overflow-hidden"
//           >

//             <img
//               src={blog.image}
//               className="w-full h-40 object-cover"
//             />

//             <div className="p-4">

//               <h2 className="font-semibold text-lg">
//                 {blog.title}
//               </h2>

//               <p className="text-sm text-gray-500 mb-2">
//                 {blog.author?.name} • {new Date(blog.createdAt).toDateString()}
//               </p>

//               <span
//                 className={`text-sm font-semibold ${
//                   blog.isPublished
//                     ? "text-green-600"
//                     : "text-yellow-600"
//                 }`}
//               >
//                 {blog.isPublished ? "Published" : "Draft"}
//               </span>

//               <div className="flex gap-2 mt-4">

//                 <Link
//                   to={`/admin/blog/${blog._id}`}
//                   className="bg-blue-500 text-white px-3 py-1 rounded"
//                 >
//                   Preview
//                 </Link>

//                 {!blog.isPublished && (
//                   <button
//                     onClick={() => publishBlog(blog._id)}
//                     className="bg-green-500 text-white px-3 py-1 rounded"
//                   >
//                     Publish
//                   </button>
//                 )}

//                 <button
//                   onClick={() => deleteBlog(blog._id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded"
//                 >
//                   Delete
//                 </button>

//               </div>

//             </div>

//           </div>
//         ))}

//       </div>

//       {/* 🔽 Pagination UI */}
//       <div className="flex justify-center mt-8 gap-2">

//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((prev) => prev - 1)}
//           className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
//         >
//           Prev
//         </button>

//         <span className="px-4 py-2 font-semibold">
//           Page {currentPage} of {totalPages}
//         </span>

//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage((prev) => prev + 1)}
//           className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
//         >
//           Next
//         </button>

//       </div>

//     </div>
//   );
// }



export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const API = import.meta.env.VITE_API_URL;
  const blogsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axios.get(
        `${API}/api/blogs/admin`,
        { withCredentials: true }
      );
      setBlogs(res.data);
    };
    fetchBlogs();
  }, []);

  // 🔢 Pagination
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const indexOfLast = currentPage * blogsPerPage;
  const indexOfFirst = indexOfLast - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirst, indexOfLast);

  // ⚠️ fix infinite page issue
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [blogs]);

  const publishBlog = async (id) => {
    await axios.put(`${API}/api/blogs/publish/${id}`, {}, { withCredentials: true });

    setBlogs((prev) =>
      prev.map((b) => (b._id === id ? { ...b, isPublished: true } : b))
    );
  };

  const deleteBlog = async (id) => {
    await axios.delete(`${API}/api/blogs/${id}`, { withCredentials: true });

    setBlogs((prev) => prev.filter((b) => b._id !== id));
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* 🔥 Navbar */}
      <div className="bg-white shadow mb-6">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-purple-600">
            Admin Dashboard
          </h1>

          <div className="flex gap-3">
            <Link to="/" className="bg-gray-200 px-4 py-2 rounded">
              🏠 Home
            </Link>

            <Link to="/blogs" className="bg-purple-500 text-white px-4 py-2 rounded">
              Blogs
            </Link>
          </div>
        </div>
      </div>

      {/* 🔥 Content */}
      <div className="p-8">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentBlogs.map((blog) => (
            <div key={blog._id} className="bg-white shadow rounded-xl overflow-hidden">

              <img src={blog.image} className="w-full h-40 object-cover" />

              <div className="p-4">
                <h2 className="font-semibold text-lg">{blog.title}</h2>

                <p className="text-sm text-gray-500 mb-2">
                  {blog.author?.name} • {new Date(blog.createdAt).toDateString()}
                </p>

                <span className={`text-sm font-semibold ${
                  blog.isPublished ? "text-green-600" : "text-yellow-600"
                }`}>
                  {blog.isPublished ? "Published" : "Draft"}
                </span>

                <div className="flex gap-2 mt-4">
                  <Link
                    to={`/admin/blog/${blog._id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Preview
                  </Link>

                  {!blog.isPublished && (
                    <button
                      onClick={() => publishBlog(blog._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Publish
                    </button>
                  )}

                  <button
                    onClick={() => deleteBlog(blog._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* 🔽 Pagination */}
        <div className="flex justify-center mt-8 gap-2">

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="px-4 py-2 font-semibold">
            Page {currentPage} of {totalPages || 1}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}