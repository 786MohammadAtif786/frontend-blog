import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Settings() {
  const [tab, setTab] = useState("account");
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 Load user
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${API}/api/v1/me`, {
        withCredentials: true,
      });

      setForm({
        name: res.data.user.name,
        email: res.data.user.email,
        password: "",
        confirmPassword: "",
      });

      setPreview(res.data.user.profilePic || "");
    };

    fetchUser();
  }, []);

  // ✏️ input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🖼️ image
  const handleFile = (e) => {
    const img = e.target.files[0];
    setFile(img);
    if (img) setPreview(URL.createObjectURL(img));
  };

  // 💾 submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password && form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const data = new FormData();

      if (form.name) data.append("name", form.name);
      if (form.password) data.append("password", form.password);
      if (file) data.append("image", file);

      await axios.put(`${API}/api/v1/update-profile`, data, {
        withCredentials: true,
      });

      toast.success("Profile updated");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-xl">

        {/* 🔙 Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-cyan-700 font-medium hover:underline"
        >
          ← Back
        </button>

        {/* 🔥 Tabs */}
        <div className="flex bg-white rounded-xl shadow mb-6 overflow-hidden">
          <button
            onClick={() => setTab("account")}
            className={`flex-1 py-3 ${
              tab === "account" ? "bg-[#157A9E] text-white" : "text-gray-600"
            }`}
          >
            🧑 Account
          </button>

          <button
            onClick={() => setTab("danger")}
            className={`flex-1 py-3 ${
              tab === "danger" ? "bg-red-500 text-white" : "text-gray-600"
            }`}
          >
            🚨 Danger Zone
          </button>
        </div>

        {/* 🧑 Account */}
        {tab === "account" && (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow"
          >
            <h2 className="text-xl font-bold mb-4">
              Account Settings
            </h2>

            {/* 🖼️ Image */}
            <div className="flex flex-col items-center mb-4">
              <img
                src={preview || "https://via.placeholder.com/100"}
                className="w-24 h-24 rounded-full object-cover mb-2"
              />
              <input type="file" onChange={handleFile} />
            </div>

            {/* Name */}
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name (optional)"
              className="w-full border p-2 mb-3 rounded"
            />

            {/* Email (disabled) */}
            <input
              value={form.email}
              disabled
              className="w-full border p-2 mb-3 rounded bg-gray-100"
            />

            {/* Password */}
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="New Password (optional)"
              className="w-full border p-2 mb-3 rounded"
            />

            {/* Confirm Password */}
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full border p-2 mb-4 rounded"
            />

            <button
              disabled={loading}
              className="w-full bg-[#157A9E] text-white py-2 rounded hover:bg-[#136b89]"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        )}

        {/* 🚨 Danger Zone */}
        {tab === "danger" && (
          <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
            <h2 className="text-xl font-bold text-red-600 mb-2">
              Danger Zone
            </h2>

            <p className="text-gray-600 mb-4">
              Deactivate your account.
            </p>

            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Delete Account
            </button>
          </div>
        )}

      </div>
    </div>
  );
}