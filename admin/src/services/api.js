import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 (token expired)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth
export const loginAdmin = (email, password) =>
  api.post("/auth/login", { email, password });

export const getMe = () => api.get("/auth/me");

export const getAllAdmins = () => api.get("/auth/all");

export const createAdmin = (data) => api.post("/auth/register", data);

export const deleteAdmin = (id) => api.delete(`/auth/${id}`);

// Registrations
export const getRegistrations = (params) =>
  api.get("/registrations", { params });

export const getRegistrationStats = () => api.get("/registrations/stats");

export const getRegistrationById = (id) => api.get(`/registrations/${id}`);

export const deleteRegistration = (id) => api.delete(`/registrations/${id}`);

// Payments
export const getAllPayments = (status) =>
  api.get("/payments/all", { params: { status } });

export const approvePayment = (id) => api.post(`/payments/approve/${id}`);

export const rejectPayment = (id, reason) =>
  api.post(`/payments/reject/${id}`, { reason });

// News
export const getNews = () => api.get("/news");

export const createNews = (data) => api.post("/news", data);

export const updateNews = (id, data) => api.put(`/news/${id}`, data);

export const deleteNews = (id) => api.delete(`/news/${id}`);

// Speakers
export const getSpeakers = () => api.get("/speakers");

export const createSpeaker = (data) => api.post("/speakers", data);

export const updateSpeaker = (id, data) => api.put(`/speakers/${id}`, data);

export const deleteSpeaker = (id) => api.delete(`/speakers/${id}`);

// Programme
export const getProgrammes = () => api.get("/programme");

export const createProgramme = (data) => api.post("/programme", data);

export const updateProgramme = (id, data) => api.put(`/programme/${id}`, data);

export const deleteProgramme = (id) => api.delete(`/programme/${id}`);

// Conference
export const getConference = () => api.get("/conference");

export const getAllConferences = () => api.get("/conference/all");

export const createConference = (data) => api.post("/conference", data);

export const updateConference = (id, data) => api.put(`/conference/${id}`, data);

export const deleteConference = (id) => api.delete(`/conference/${id}`);

// Contacts
export const getContacts = () => api.get("/contacts");

export const deleteContact = (id) => api.delete(`/contacts/${id}`);

export default api;