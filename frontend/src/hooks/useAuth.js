import { apiRequest } from "../services/apiService";

export default function useAuth() {
  const login = async (email, password) => {
    const data = await apiRequest("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    localStorage.setItem("token", data.token);
    return data;
  };

  const register = async (name, email, password) => {
    return await apiRequest("/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  const isAuthenticated = () => !!localStorage.getItem("token");

  return { login, register, logout, isAuthenticated };
}
