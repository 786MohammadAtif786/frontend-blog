import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Settings() {
  const API = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // 👤 load current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API}/api/v1/me`, {
          withCredentials: true,
        });

        setForm({
          ...form,
          name: res.data.user.name,
          email: res.data.user.email,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  // ✏️ change handler
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 💾 update profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email) {
      return toast.error("Name & Email required");
    }

    try {
      setLoading(true);

      await axios.put(
        `${API}/api/v1/update-profile`,
        form,
        { withCredentials: true }
      );

      toast.success("Profile updated");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6">
          ⚙️ Account Settings
        </h2>

        {/* Name */}
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2 mb-3 rounded"
        />

        {/* Email */}
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          disabled
          className="w-full border p-2 mb-3 rounded"
        />

        {/* Password */}
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="New Password (optional)"
          className="w-full border p-2 mb-4 rounded"
        />


                        <input
                type="file"
                onChange={async (e) => {
                    const file = e.target.files[0];

                    const formData = new FormData();
                    formData.append("image", file);

                    await axios.put(
                    `${API}/api/v1/upload-profile`,
                    formData,
                    { withCredentials: true }
                    );

                    alert("Profile updated");
                    window.location.reload();
                }}
                />

        <button
          disabled={loading}
          className="w-full bg-[#157A9E] text-white py-2 mt-10 rounded hover:bg-[#136b89]"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

      </form>

    </div>
  );
}