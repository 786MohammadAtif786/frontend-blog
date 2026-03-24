import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ForgotPassword() {

    const API = import.meta.env.VITE_API_URL;

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await axios.post(`${API}/api/v1/forgot-password`, {
                email
            });

            toast.success(res.data.message || "Reset link sent");

        } catch (err) {
            toast.error(
                err.response?.data?.message || "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow w-96"
            >

                <h2 className="text-xl font-bold mb-4">
                    Forgot Password
                </h2>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border p-2 mb-3 rounded"
                />

                <button
                    disabled={loading}
                    className="w-full bg-purple-600 text-white py-2 rounded"
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>

                <p className="text-sm text-center mt-4">
                    Back to{" "}
                    <Link to="/login" className="text-purple-600 font-semibold">
                        Login
                    </Link>
                </p>

            </form>

        </div>
    );
}