import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const USER_KEY = "savora-v3-user";
const SESSION_KEY = "savora-v3-session";

function loadUser() {

  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }

}

function loadSession() {

  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }

}

export function AuthProvider({ children }) {

  const [session, setSession] = useState(loadSession);

  function register({ name, email, password }) {

    const user = { name, email, password };

    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch {
      /* abaikan */
    }

    return login({ email, password });

  }

  function login({ email, password }) {

    const user = loadUser();

    if (!user || user.email !== email || user.password !== password) {

      return {
        ok: false,
        message: "Email atau password salah."
      };

    }

    const newSession = { name: user.name, email: user.email };

    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
    } catch {
      /* abaikan */
    }

    setSession(newSession);

    return { ok: true };

  }

  function logout() {

    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      /* abaikan */
    }

    setSession(null);

  }

  function updateProfile({ name }) {

    const user = loadUser();

    if (!user) return;

    const updatedUser = { ...user, name };

    try {
      localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
    } catch {
      /* abaikan */
    }

    const updatedSession = { ...session, name };

    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(updatedSession));
    } catch {
      /* abaikan */
    }

    setSession(updatedSession);

  }

  function hasAccount() {
    return !!loadUser();
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        isAuthenticated: !!session,
        register,
        login,
        logout,
        updateProfile,
        hasAccount
      }}
    >
      {children}
    </AuthContext.Provider>
  );

}

export function useAuth() {
  return useContext(AuthContext);
}
