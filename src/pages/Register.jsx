
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // 🔥 Frontend validation
        if (!form.name) return toast.error("Name is required");
        if (!form.email) return toast.error("Email is required");
        if (!form.password) return toast.error("Password is required");
        if (form.password.length < 4) {
            return toast.error("Password must be at least 4 characters");
        }
            const API = import.meta.env.VITE_API_URL;

        try {
            setLoading(true);

            const res = await axios.post(
                `${API}/api/v1/register`,
                form
            );

            // ✅ success message
            toast.success("Verification email sent 📩");

            // ✅ form reset
            setForm({
                name: "",
                email: "",
                password: ""
            });

            // ✅ redirect (optional but best UX)
            // navigate("/check-email");
            navigate("/check-email", {
                state: { email: form.email }
            });
        } catch (err) {

            const errors = err.response?.data;

            // 🔥 backend validation errors
            if (errors?.errors && errors.errors.length > 0) {
                toast.error(errors.errors[0]); // only first error
            } else {
                toast.error(errors?.message || "Register failed");
            }

        } finally {
            setLoading(false);
        }
    };


    return (

        <>
            {/* 🔥 FULL PAGE LOADER */}
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="flex flex-col items-center gap-4">

                        {/* Spinner */}
                        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>

                        <p className="text-white text-lg font-semibold">
                            Creating account...
                        </p>
                    </div>
                </div>
            )}

            {/* बाकी UI */}
            <p className="text-sm text-center mt-2">
                Go back to{" "}
                <Link to="/" className="text-cyan-800 font-semibold">
                    Home
                </Link>
            </p>

            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-xl shadow w-96"
                >

                    <h3 className="p-3 text-center text-lg font-semibold">
                        Welcome to Dev Notes
                    </h3>

                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="john dee"
                        className="w-full border p-2 mb-3 rounded"
                    />

                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="example@example.com"
                        className="w-full border p-2 mb-3 rounded"
                    />

                    <input
                        name="password"
                        value={form.password}
                        type="password"
                        onChange={handleChange}
                        placeholder="********"
                        className="w-full border p-2 mb-3 rounded"
                    />

                    <button
                        disabled={loading}
                        className="w-full bg-[#157A9E] hover:bg-[#136b89] text-white py-2 rounded"
                    >
                        {loading ? "Please wait..." : "Submit"}
                    </button>

                    <p className="text-sm text-center mt-4">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-cyan-800 font-semibold"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );

}