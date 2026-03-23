import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";

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
import AdminBlogDetail from './pages/BlogDetail.jsx'
import MyBlogs from "./pages/MyBlogs";
import CategoryBlogs from "./pages/CategoryBlogs.jsx";
import CheckEmail from "./pages/CheckEmail.jsx";
import Footer from "./components/Footer.jsx";
import SearchPage from "./pages/SearchPage.jsx"
import Users from "./pages/Users.jsx";

function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL;
  useEffect(() => {

    const getUser = async () => {

      try {

        const res = await axios.get(
          `${API}/api/v1/me`,
          { withCredentials: true }
        );

        setUser(res.data.user);

      } catch (err) {

        setUser(null);

      } finally {

        setLoading(false);

      }

    };

    getUser();

  }, []);


  useEffect(() => {
  const refresh = async () => {
    try {
      const res = await axios.post(
        `${API}/api/v1/refresh`,
        {},
        { withCredentials: true }
      );

      // 🔥 new access token store karo
      localStorage.setItem("accessToken", res.data.accessToken);

    } catch (err) {
      console.log("Not logged in");
    }
  };

  refresh();
}, []);

  // ✅ loading check yaha hoga
  if (loading) {
    return <Loading />;
  }

  return (

    <BrowserRouter>

      <Toaster position="top-right" />

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
                <Route path="/my-blogs" element={<MyBlogs />} />


        <Route
          path="/write"
          element={
            <ProtectedRoute user={user}>
              <WriteBlog />

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
        <Route path="*" element={<NotFound />} />
      </Routes>
        <Footer />
    </BrowserRouter>

  );

}

export default App;


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YmFmMDhiYTNlOWZkNDZmZWYzMjJkYyIsImlhdCI6MTc3NDExNTM0MywiZXhwIjoxNzc0MTE2MjQzfQ.paMqdDwsW9L3dMUE1BgxN4E8m0oI3MbfFWAlTM1EWQY
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YmFmMDhiYTNlOWZkNDZmZWYzMjJkYyIsImlhdCI6MTc3NDExNTM0MywiZXhwIjoxNzc0MTE2MjQzfQ.paMqdDwsW9L3dMUE1BgxN4E8m0oI3MbfFWAlTM1EWQY