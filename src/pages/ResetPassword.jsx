import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function ResetPassword() {

    const { token } = useParams();
    const navigate = useNavigate();
    const API = import.meta.env.VITE_API_URL;

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return toast.error("Passwords do not match");
        }

        if (password.length < 6) {
            return toast.error("Password must be at least 6 characters");
        }

        try {
            setLoading(true);

            const res = await axios.post(
                `${API}/api/v1/reset-password/${token}`,
                { password }
            );

            toast.success(res.data.message || "Password reset successful");

            // redirect to login
            navigate("/login");

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
                    Reset Password
                </h2>

                <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border p-2 mb-3 rounded"
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border p-2 mb-3 rounded"
                />

                <button
                    disabled={loading}
                    className="w-full bg-purple-600 text-white py-2 rounded"
                >
                    {loading ? "Resetting..." : "Reset Password"}
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