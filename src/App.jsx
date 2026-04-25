import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import  './App.css'

import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";

import PublicRoute from "./components/PublicRoute.jsx";
import NotFound from "./pages/NotFound.jsx";
import WriteBlog from "./pages/WriteBlog.jsx"
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./components/Loading.jsx";
import BlogDetail from "./pages/BlogDetail";
import AdminBlogDetail from './pages/AdminBlogDetail.jsx'
import MyBlogs from "./pages/MyBlogs";
import CategoryBlogs from "./pages/CategoryBlogs.jsx";
import CheckEmail from "./pages/CheckEmail.jsx";
import Footer from "./components/Footer.jsx";
import SearchPage from "./pages/SearchPage.jsx"
import Users from "./pages/Users.jsx";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { useLocation } from "react-router-dom";
import Settings from './pages/Settings.jsx';

function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
    const location = useLocation();

  const API = import.meta.env.VITE_API_URL;
    const hideFooterRoutes = ["/login", "/register", "/forgot-password"];

     const hideFooter = hideFooterRoutes.includes(location.pathname);

useEffect(() => {
  const getUser = async () => {
    try {
      const res = await axios.get(
        `${API}/api/v1/me`,
        { withCredentials: true }
      );

      setUser(res.data.user);

    } catch (err) {

      try {
        // 🔥 try refresh
        await axios.post(
          `${API}/api/v1/refresh`,
          {},
          { withCredentials: true }
        );

        // 🔥 retry /me
        const res = await axios.get(
          `${API}/api/v1/me`,
          { withCredentials: true }
        );

        setUser(res.data.user);

      } catch {
        setUser(null);
      }

    } finally {
      setLoading(false);
    }
  };

  getUser();
}, []);


  // ✅ loading check yaha hoga
  if (loading) {
    return <Loading />;
  }

  return (

<>

      <Toaster position="top-centers" />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
         {/* <Route path="/my-blogs" element={<MyBlogs />} /> */}
         <Route
            path="/my-blogs"
            element={
              <ProtectedRoute user={user}>
                <MyBlogs />
              </ProtectedRoute>
            }
          />
        <Route
          path="/write"
          element={
            <ProtectedRoute user={user}>
              <WriteBlog />

            </ProtectedRoute>
          }
        />
        <Route
        path="/settings"
        element={
          <ProtectedRoute user={user}>
            <Settings />
          </ProtectedRoute>
        }
/>

        <Route
          path="/admin"
          element={
            <AdminRoute user={user}>
              <AdminDashboard />
            </AdminRoute>
          }
        />
         <Route
          path="/users"
          element={
            <AdminRoute user={user}>
              <Users />
            </AdminRoute>
          }
        />
        <Route path="/admin/blog/:id"
          element={
            <AdminRoute user={user}>
              <AdminBlogDetail />
            </AdminRoute>
          }
        />
        <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/category/:category" element={<CategoryBlogs />} />
          <Route path="/check-email" element={<CheckEmail />} />
          <Route path="/search" element={<SearchPage />} />
        {/* <Route path="/write" element={<WriteBlog />} />
          <Route path="/admin" element={<AdminDashboard />} /> */}
        <Route path="/verify/:token" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideFooter && <Footer />}

  

</>
  )
}

export default App;
