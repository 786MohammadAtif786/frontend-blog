import { Navigate } from "react-router-dom";

export default function AdminRoute({ user, children }) {

  if (!user) {
    return <Navigate to="/login" />;
  }
  console.log('this', user);
  
  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}