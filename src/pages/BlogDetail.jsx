import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import CommentSection from "../components/CommentSection.jsx";

export default function BlogDetail() {

  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);
  const [user, setUser] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // ✅ Remove HTML tags for reading time
  const plainText = blog?.content?.replace(/<[^>]+>/g, "") || "";
  const words = plainText.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.ceil(words / 200);
      const API = import.meta.env.VITE_API_URL;


  const viewed = localStorage.getItem(`viewed-${id}`);

  if (!viewed) {
    // call API
    localStorage.setItem(`viewed-${id}`, true);
  }



  // ✅ Like Function
  const handleLike = async () => {
    try {
      const res = await axios.put(
        `${API}/api/blogs/like/${id}`,
        {},
        { withCredentials: true }
      );
      setLikes(res.data.likes);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Get Logged-in User
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
      }
    };
    getUser();
  }, []);

  // ✅ Fetch Blog
  useEffect(() => {
    const fetchBlog = async () => {
      const res = await axios.get(
        `${API}/api/blogs/${id}`
      );
      setBlog(res.data);
      setLikes(res.data.likes?.length || 0);
    };
    fetchBlog();
  }, [id]);

  // ✅ Related Blogs
  useEffect(() => {
    const fetchRelated = async () => {
      const res = await axios.get(
        `${API}/api/blogs/related/${id}`
      );
      setRelatedBlogs(res.data);
    };
    fetchRelated();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(
        `${API}/api/comments/${id}`
      );
      setComments(res.data);
    };

    fetchComments();
  }, [id]);


  useEffect(() => {

  const fetchBlog = async () => {

    try {
      const viewed = localStorage.getItem(`viewed-${id}`);

      // 🔥 Sirf ek hi API call
      const res = await axios.get(
        `${API}/api/blogs/${id}`
      );

      setBlog(res.data);
      setLikes(res.data.likes?.length || 0);

      // 🔥 view mark karo
      if (!viewed) {
        localStorage.setItem(`viewed-${id}`, true);
      }

    } catch (err) {
      console.log(err);
    }

  };

  fetchBlog();

}, [id]);

  if (!blog) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center gap-4">
        
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-lg font-semibold text-gray-700">
          Loading...
        </p>

      </div>
    </div>
  );
}

  const handleComment = async () => {
    if (!user) {
      alert("Login required");
      return;
    }

    if (!newComment.trim()) return;

    const res = await axios.post(
      `${API}/api/comments/${id}`,
      { content: newComment },
      { withCredentials: true }
    );

    setComments([res.data, ...comments]);
    setNewComment("");
  };

  return (
  <div className="bg-gray-100 prose max-w-none overflow-x-auto">

    {/* Navbar */}
    <Navbar />

    <div className="flex flex-col lg:flex-row">

      {/* Blog Content */}
      <div className="flex-1 flex justify-center">
        <div className="max-w-3xl w-full p-4 lg:p-6">

          {/* Title */}
          <h1 className="text-2xl lg:text-4xl font-bold mb-4">
            {blog.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-2 text-gray-500 mb-4 text-sm">
            <span>Written by {blog.author?.name || "user deleted"}</span>
            <span>•</span>
            <span>{new Date(blog.createdAt).toDateString()}</span>
            <span>• {readingTime} min read</span>
            {/* <span>👁 {blog.views} views</span> */}
          </div>

          {/* Image */}
          <img
            src={blog.image}
            alt="blog"
            className="rounded-xl mb-6 w-full object-cover"
          />

          {/* Content */}
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></div>

        </div>
      </div>

      {/* Sidebar (Responsive) */}
      <div className="w-full lg:w-80 bg-white border-t lg:border-l p-4 lg:p-6 mt-6 lg:mt-0">

        {/* Like Button */}
        {/* <button
          onClick={handleLike}
          disabled={blog.author?._id === user?._id}
          className="w-full bg-cyan-600 text-white py-2 rounded-lg mb-6 hover:bg-purple-700"
        >
          👍 Like ({likes})
        </button> */}
        <button
        onClick={handleLike}
        disabled={blog.author?._id === user?._id}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white hover:bg-cyan-100 transition cursor-pointer"
      >
        <span className="text-red-500 text-lg">❤️</span>
        <span className="text-sm font-medium text-gray-700">{likes}</span>
      </button>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6 mt-10">
          {blog.categories?.map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat}`}
              className="bg-purple-100 text-cyan-700 px-3 py-1 rounded-full text-sm hover:bg-cyan-100 transition"
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Related Blogs */}
        <h3 className="font-bold mb-3">Related Posts</h3>

        <div className="space-y-4">
          {relatedBlogs.map((b) => (
            <Link
              key={b._id}
              to={`/blog/${b._id}`}
              className="flex gap-3 items-center hover:bg-gray-100 p-2 rounded"
            >
              <img
                src={b.image}
                alt="related"
                className="w-16 h-16 object-cover rounded"
              />

              <div>
                <p className="text-sm font-semibold">
                  {b.title}
                </p>

                <p className="text-xs text-gray-500">
                  by {b.author?.name}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>

    </div>

    {/* Comments */}
    <CommentSection blogId={id} user={user} />

  </div>
);
}

