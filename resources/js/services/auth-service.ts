// src/services/authService.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://leadtie.onrender.com/api';

// Login
export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  const { token } = response.data;

  localStorage.setItem('tokenCRM', token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Logout
export const logout = async () => {
  const token = localStorage.getItem('tokenCRM');
  if (token) {
    try {
      await axios.post(`${API_URL}/logout`);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  localStorage.removeItem('tokenCRM');
  delete axios.defaults.headers.common['Authorization'];
};

export const refreshToken = async (): Promise<string | null> => {
  try {
    const response = await axios.post('/refresh', {}, { withCredentials: true });
    const newAccessToken = response.data.token;
    
    // Guarda el nuevo token donde lo estés usando (contexto, estado global, etc.)
    localStorage.setItem('accessToken', newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error('Error al refrescar el token:', error);
    return null;
  }
};


// Obtener usuario autenticado
export const getUser = async () => {
  const token = localStorage.getItem('tokenCRM');
  if (!token) return null;

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  try {
    const response = await axios.post(`${API_URL}/getuser`);
    return response.data;
  } catch {
    logout();
    return null;
  }
};