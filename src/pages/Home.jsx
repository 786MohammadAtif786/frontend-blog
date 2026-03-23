import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";

export default function Home() {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
          const API = import.meta.env.VITE_API_URL;

        const fetchBlogs = async () => {

            const res = await axios.get(
                `${API}/api/blogs`
            );

            setBlogs(res.data);

        }

        fetchBlogs();

    }, []);


  return (
    
    <div className="flex bg-gray-100 min-h-screen">
      <div
  dangerouslySetInnerHTML={{ __html: blogs.content }}
/>
      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">

                 {blogs.map((blog) => (
                 <BlogCard key={blog._id} blog={blog} />
           ))} 
        </div>

      </div>

    </div>

  );
}

