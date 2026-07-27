import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";

export default function AdminRoute({ children }) {

  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/app" replace />;
  }

  return children;

}
