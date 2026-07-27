import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const USER_KEY = "savora-v3-user";
const SESSION_KEY = "savora-v3-session";

const ADMIN_EMAIL = "gtau22609@gmail.com";

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

  function changePassword({ currentPassword, newPassword }) {

    const user = loadUser();

    if (!user || user.password !== currentPassword) {

      return { ok: false, message: "Password saat ini salah." };

    }

    const updatedUser = { ...user, password: newPassword };

    try {
      localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
    } catch {
      /* abaikan */
    }

    return { ok: true };

  }

  function deleteAccount() {

    try {
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem("savora-v3-data");
    } catch {
      /* abaikan */
    }

    setSession(null);

  }

  function hasAccount() {
    return !!loadUser();
  }

  const isAdmin = session?.email === ADMIN_EMAIL;

  return (
    <AuthContext.Provider
      value={{
        session,
        isAuthenticated: !!session,
        isAdmin,
        register,
        login,
        logout,
        updateProfile,
        changePassword,
        deleteAccount,
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
