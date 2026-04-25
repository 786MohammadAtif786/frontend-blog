// import { useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import Loading from "../components/Loading.jsx";


// export default function Login() {

//     const navigate = useNavigate();
//     const API = import.meta.env.VITE_API_URL;

//     const [form, setForm] = useState({
//         email: "",
//         password: ""
//     });

//     const [loading, setLoading] = useState(false);

//     if (loading) {
//         return <Loading />;
//     }

//     const handleChange = (e) => {
//         setForm({
//             ...form,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {

//             setLoading(true);

//             const res = await axios.post(
//                 `${API}/api/v1/login`,
//                 form,
//                 { withCredentials: true }
//             );

//             toast.success("Login successful");

//             navigate("/");
//             window.location.reload();
//         } catch (err) {

//             toast.error(
//                 err.response?.data?.message || "Login failed"
//             );

//         } finally {
//             setLoading(false);
//         }

//     };
//     // if (!form.email || !form.password) {
//     //     return toast.error("All fields are required");
//     // }
//     return (

//         <>

//             <p className="text-sm text-center mt-2">
//                 Go back to{" "}
//                 <Link to="/" className="text-purple-600 font-semibold">
//                     Home
//                 </Link>
//             </p>

//             <div className="flex justify-center items-center min-h-screen bg-gray-100">

//                 <form
//                     onSubmit={handleSubmit}
//                     className="bg-white p-8 rounded-xl shadow w-96"
//                 >

//                     <h2 className="text-xl font-bold mb-4">
//                         Login
//                     </h2>

//                     <input
//                         name="email"
//                         value={form.email}
//                         onChange={handleChange}
//                         placeholder="Enter your email"
//                         className="w-full border p-2 mb-3 rounded"
//                     />

//                     <input
//                         name="password"
//                         type="password"
//                         value={form.password}
//                         onChange={handleChange}
//                         placeholder="Enter password"
//                         className="w-full border p-2 mb-3 rounded"
//                     />

//                     <button
//                         disabled={loading}
//                         className="w-full bg-purple-600 text-white py-2 rounded"
//                     >
//                         {loading ? "Logging in..." : "Login"}
//                     </button>

//                     <p className="text-sm text-center mt-4">
//                         Don't have an account?{" "}
//                         <Link
//                             to="/register"
//                             className="text-purple-600 font-semibold"
//                         >
//                             Register
//                         </Link>
//                     </p>




//                     <p className="text-right text-sm mb-3 p-4">
//                         <Link to="/forgot-password" className="text-purple-600 font-semibold">
//                             Forgot Password?
//                         </Link>
//                     </p>
//                 </form>

//             </div>
//         </>

//     );

// }





import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
 //const API = import.meta.env.VITE_API_URL;
  const API = "https://backend-blog-9qq5.onrender.com"
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ⏱️ TIMER
  const startTimer = (initialTime) => {
    let time = initialTime;
    setTimer(time);

    const interval = setInterval(() => {
      time--;
      setTimer(time);

      if (time <= 0) {
        clearInterval(interval);
        setBlocked(false);
        localStorage.removeItem("loginBlockedUntil"); // ✅ cleanup
      }
    }, 1000);
  };

  // 🔥 RESTORE AFTER REFRESH
  useEffect(() => {
    const blockedUntil = localStorage.getItem("loginBlockedUntil");

    if (blockedUntil) {
      const remaining = Math.floor((blockedUntil - Date.now()) / 1000);

      if (remaining > 0) {
        setBlocked(true);
        startTimer(remaining);
      } else {
        localStorage.removeItem("loginBlockedUntil");
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email) {
    toast.error("Email is required");
    return;
  }

  if (!form.password) {
    toast.error("Password is required");
    return;
  }

    if (loading || blocked) return;

    try {
      setLoading(true);

        await axios.post(
      `${API}/api/v1/login`,
      form,
      { withCredentials: true }
    );

      toast.success("Login successful");

      window.location.href = "/";

    } catch (err) {
      const status = err.response?.status;

      if (status === 429) {
        const ttl = err.response?.data?.ttl || 120;

        setBlocked(true);
        startTimer(ttl);

        const expiryTime = Date.now() + ttl * 1000;
        localStorage.setItem("loginBlockedUntil", expiryTime);

        toast.error("Too many attempts");
      } else {
        toast.error(err.response?.data?.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {blocked ? (
        <div className="bg-red-100 p-6 rounded text-center">
          <h2 className="text-red-600 font-bold">Blocked</h2>
          <p>
            Try again in {Math.floor(timer / 60)}:
            {String(timer % 60).padStart(2, "0")}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96">
          <h2 className="text-xl font-bold mb-4">Login</h2>

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-2 mb-3"
          />

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border p-2 mb-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2"
          >
            {/* {loading ? "Logging in..." : "Login"} */}
            {/* {loading ? (
  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
) : (
  "Login"
)} */}


        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Logging in...
          </span>
        ) : (
          "Login"
        )}

          </button>
                 <p className="text-right text-sm mb-3 p-4">
                         <Link to="/forgot-password" className="text-purple-600 font-semibold">
                             Forgot Password?
                         </Link>
                    </p> 
       
                           <p className="text-sm text-center mt-4">
                         Don't have an account?{" "}
                         <Link
                             to="/register"
                             className="text-purple-600 font-semibold"
                         >
                             Register
                         </Link>
                     </p>

        </form>
      )}
    </div>
  );
}