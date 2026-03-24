import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "../components/Loading.jsx";


export default function Login() {

    const navigate = useNavigate();
    const API = import.meta.env.VITE_API_URL;

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    if (loading) {
        return <Loading />;
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            setLoading(true);

            const res = await axios.post(
                `${API}/api/v1/login`,
                form,
                { withCredentials: true }
            );

            toast.success("Login successful");

            navigate("/");
            window.location.reload();
        } catch (err) {

            toast.error(
                err.response?.data?.message || "Login failed"
            );

        } finally {
            setLoading(false);
        }

    };

    return (

        <>

            <p className="text-sm text-center mt-2">
                Go back to{" "}
                <Link to="/" className="text-purple-600 font-semibold">
                    Home
                </Link>
            </p>

            <div className="flex justify-center items-center min-h-screen bg-gray-100">

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-xl shadow w-96"
                >

                    <h2 className="text-xl font-bold mb-4">
                        Login
                    </h2>

                    <input
                        name="email"
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full border p-2 mb-3 rounded"
                    />

                    <input
                        name="password"
                        type="password"
                        onChange={handleChange}
                        placeholder="Enter password"
                        className="w-full border p-2 mb-3 rounded"
                    />

                    <button
                        disabled={loading}
                        className="w-full bg-purple-600 text-white py-2 rounded"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <p className="text-sm text-center mt-4">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-purple-600 font-semibold"
                        >
                            Register
                        </Link>
                    </p>

                    


                <p className="text-right text-sm mb-3 p-4">
                        <Link to="/forgot-password" className="text-purple-600 font-semibold">
                            Forgot Password?
                        </Link>
                    </p>
                </form>

            </div>
        </>

    );

}