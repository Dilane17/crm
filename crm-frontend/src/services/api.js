import axios from "axios";

const API_BASE_URL = "http://localhost:3001"; // Backend NestJS

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Intercepteur pour ajouter le token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (userData) => api.post("/auth/register", userData),
  login: (loginData) => api.post("/auth/login", loginData),
};

export const clientsAPI = {
  getAll: () => api.get("/clients"),
  create: (clientData) => api.post("/clients", clientData),
  update: (id, clientData) => api.patch(`/clients/${id}`, clientData),
  delete: (id) => api.delete(`/clients/${id}`),
};

export const interactionsAPI = {
  getByClient: (clientId) => api.get(`/interactions/client/${clientId}`),
  create: (interactionData) => api.post("/interactions", interactionData),
  update: (id, interactionData) =>
    api.patch(`/interactions/${id}`, interactionData),
  delete: (id) => api.delete(`/interactions/${id}`),
};

export default api;
