



import { useState } from "react";
import axios from "axios";

export default function CommentItem({ comment, user, refresh }) {

    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState("");
    const [showReply, setShowReply] = useState(false);
    const [replyText, setReplyText] = useState("");
    const API = import.meta.env.VITE_API_URL;

    // 🗑️ Delete
    const handleDelete = async () => {
        await axios.delete(
            `${API}/api/comments/${comment._id}`,
            { withCredentials: true }
        );
        refresh();
    };

    // ✏️ Start Edit
    const startEdit = () => {
        setEditId(comment._id);
        setEditText(comment.content);
    };

    // 💾 Save Edit
    const saveEdit = async () => {
        await axios.put(
            `${API}/api/comments/${comment._id}`,
            { content: editText },
            { withCredentials: true }
        );
        setEditId(null);
        refresh();
    };

    // 💬 Reply
    const handleReply = async () => {
        if (!user) return alert("Login required");

        await axios.post(
            `${API}/api/comments/${comment.blog}`,
            {
                content: replyText,
                parentComment: comment._id,
            },
            { withCredentials: true }
        );

        setReplyText("");
        setShowReply(false);
        refresh();
    };

    return (
        <div className="ml-4 mt-4 border-l pl-4">

            <p className="font-semibold text-sm">
                {comment.user?.name}
            </p>

            {/* EDIT MODE */}
            {editId === comment._id ? (
                <div className="flex gap-2 mt-1">
                    <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-1 border p-1 rounded text-sm"
                    />
                    <button
                        onClick={saveEdit}
                        className="text-green-600 text-xs"
                    >
                        Save
                    </button>
                </div>
            ) : (
                <p className="text-sm">{comment.content}</p>
            )}

            <p className="text-xs text-gray-400">
                {new Date(comment.createdAt).toLocaleString()}
            </p>

            {/* ACTIONS */}
            <div className="flex gap-3 text-xs mt-1">

                {/* Reply only if logged in */}
                {user && (
                    <button
                        onClick={() => setShowReply(!showReply)}
                        className="text-blue-600"
                    >
                        Reply
                    </button>
                )}

                {(user && (user._id === comment.user._id || user.role === "admin")) && (
                    <>
                        <button
                            onClick={startEdit}
                            className="text-green-600"
                        >
                            Edit
                        </button>

                        <button
                            onClick={handleDelete}
                            className="text-red-600"
                        >
                            Delete
                        </button>
                    </>
                )}

            </div>

            {/* Reply box */}
            {showReply && (
                <div className="flex gap-2 mt-2">
                    <input
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="flex-1 border p-1 rounded text-sm"
                        placeholder="Write reply..."
                    />
                    <button
                        onClick={handleReply}
                        className="bg-blue-600 text-white px-2 rounded text-xs"
                    >
                        Post
                    </button>
                </div>
            )}

            {/* 🔥 RECURSION (Nested replies) */}
            {comment.replies?.map((reply) => (
                <CommentItem
                    key={reply._id}
                    comment={reply}
                    user={user}
                    refresh={refresh}
                />
            ))}

        </div>
    );
}