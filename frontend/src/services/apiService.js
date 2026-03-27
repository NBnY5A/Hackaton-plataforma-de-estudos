const API_BASE_URL = import.meta.env.BACKEND_API_URL || "http://localhost:3000/api";

export async function apiRequest(path, options = {}) {
  const jwtToken = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}),
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.error || "Erro na requisição");
  }

  return data;
}
