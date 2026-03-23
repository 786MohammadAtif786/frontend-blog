

import { useEffect, useState } from "react";
import axios from "axios";
import CommentItem from "./CommentItem";

export default function CommentSection({ blogId, user }) {

  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
    const API = import.meta.env.VITE_API_URL;

  const fetchComments = async () => {
    const res = await axios.get(
      `${API}/api/comments/${blogId}`
    );
    setComments(res.data);
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  // ✅ Add top-level comment
  const handleAdd = async () => {
    if (!user) return alert("Login required");
    if (!text.trim()) return;

    await axios.post(
      `${API}/api/comments/${blogId}`,
      { content: text },
      { withCredentials: true }
    );

    setText("");
    fetchComments();
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">

      <h2 className="text-xl font-bold mb-4">
        Comments ({comments.length})
      </h2>

      {/* Add comment */}
      {user ? (
        <div className="flex gap-2 mb-6">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 border p-2 rounded text-sm"
            placeholder="Write a comment..."
          />
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Post
          </button>
        </div>
      ) : (
        <p className="text-red-500 text-sm mb-4">
          Login required
        </p>
      )}

      {/* Comments */}
      {comments.map((c) => (
        <CommentItem
          key={c._id}
          comment={c}
          user={user}
          refresh={fetchComments}
        />
      ))}

    </div>
  );
}