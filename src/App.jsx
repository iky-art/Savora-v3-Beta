import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext.jsx";
import { AuthProvider } from "./AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Transactions from "./pages/Transactions.jsx";
import Savings from "./pages/Savings.jsx";
import Goals from "./pages/Goals.jsx";
import Analytics from "./pages/Analytics.jsx";
import Settings from "./pages/Settings.jsx";

export default function App() {

  return (
    <ThemeProvider>
      <AuthProvider>
        <HashRouter>
          <Routes>

            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/app"
              element={<ProtectedRoute><Home /></ProtectedRoute>}
            />
            <Route
              path="/app/transactions"
              element={<ProtectedRoute><Transactions /></ProtectedRoute>}
            />
            <Route
              path="/app/savings"
              element={<ProtectedRoute><Savings /></ProtectedRoute>}
            />
            <Route
              path="/app/goals"
              element={<ProtectedRoute><Goals /></ProtectedRoute>}
            />
            <Route
              path="/app/analytics"
              element={<ProtectedRoute><Analytics /></ProtectedRoute>}
            />
            <Route
              path="/app/settings"
              element={<ProtectedRoute><Settings /></ProtectedRoute>}
            />

          </Routes>
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  );

}
