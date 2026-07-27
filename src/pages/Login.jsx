import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";

export default function Login() {

  const { login, hasAccount } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {

    e.preventDefault();
    setError("");

    if (!hasAccount()) {

      setError("Belum ada akun. Silakan daftar dulu.");

      return;

    }

    const result = login({ email, password });

    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate("/app");

  }

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">S</div>

        <h1>Masuk ke Savora</h1>
        <p className="auth-subtitle">Kelola tabunganmu, mulai dari sini.</p>

        <form className="auth-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="kamu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="btn btn-primary btn-block">
            Masuk
          </button>

        </form>

        <p className="auth-switch">
          Belum punya akun? <Link to="/register">Daftar</Link>
        </p>

      </div>

    </div>
  );

}
