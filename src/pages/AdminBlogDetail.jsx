import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminBlogDetail() {

  const { id } = useParams();
  const [blog,setBlog] = useState(null);
  const API = import.meta.env.VITE_API_URL;

  useEffect(()=>{

    const fetchBlog = async ()=>{

      const res = await axios.get(
        `${API}/api/blogs/${id}`
      );

      setBlog(res.data);

    };

    fetchBlog();

  },[id]);

  if(!blog) return <p>Loading...</p>;

  return(

    <div className="max-w-3xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-4">
        {blog.title}
      </h1>

      <p className="text-gray-500 mb-6">
        {blog.author?.name} • {new Date(blog.createdAt).toDateString()}
      </p>

      <img
        src={blog.image}
        className="mx-auto rounded-lg mb-6"
      />

      <p className="leading-relaxed text-gray-700">
        {blog.content}
      </p>

    </div>

  );

}