import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function WriteBlog() {

  const navigate = useNavigate();

  const categoryOptions = [
    "Business",
    "Education & Career",
    "Entertainment",
    "Fashion & Beauty",
    "Food & Drinks",
    "Technology",
    "Sports",
  ];

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const handleCategoryChange = (e) => {

    const { value, checked } = e.target;

    if (checked) {
      setCategories([...categories, value]);
    } else {
      setCategories(categories.filter(cat => cat !== value));
    }

  };

  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // ✅ start loading

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("content", content);

      categories.forEach(cat => {
        formData.append("categories", cat);
      });

      formData.append("image", image);

      await axios.post(
        `${API}/api/blogs`,
        formData,
        { withCredentials: true }
      );

      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">

      <div className="bg-white shadow-xl rounded-xl w-full max-w-3xl p-8">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Write Blog
        </h2>

        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-3">

              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

              <p className="text-sm font-medium">
                Publishing your blog...
              </p>

            </div>

          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Title */}
          <input
            type="text"
            placeholder="Blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-3 rounded-lg w-full"
            required
          />

          {/* CKEditor */}
          <div>

            <p className="font-semibold mb-2">
              Write Content
            </p>

            <div className="border rounded-lg overflow-hidden">

              <CKEditor
                editor={ClassicEditor}
                data={content}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setContent(data);
                }}
              />

            </div>

          </div>

          {/* Categories */}

          <div>

            <p className="font-semibold mb-2">
              Select Categories
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

              {categoryOptions.map(cat => (

                <label
                  key={cat}
                  className="flex items-center gap-2 text-sm"
                >

                  <input
                    type="checkbox"
                    value={cat}
                    onChange={handleCategoryChange}
                  />

                  {cat}

                </label>

              ))}

            </div>

          </div>

          {/* Image Upload */}

          <div>

            <p className="font-semibold mb-2">
              Upload Image
            </p>

            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="border p-2 rounded-lg w-full"
            />

          </div>

          {/* Buttons */}

          <div className="flex gap-3">

            {/* <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Publish Blog
            </button> */}

            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-2 rounded-lg text-white ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {loading ? "Publishing..." : "Publish Blog"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default WriteBlog;