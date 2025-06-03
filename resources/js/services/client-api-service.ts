import axios, { AxiosResponse, AxiosError } from 'axios';

// URL base de la API
const API_URL = import.meta.env.VITE_API_URL || 'https://leadtie.onrender.com/api';

// Configuración de Axios para agregar el token en los encabezados
const getAuthHeader = () => {
  const token = localStorage.getItem('tokenCRM');
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

// Instancia de Axios con configuración base
const api = axios.create({
  baseURL: API_URL,
  headers: getAuthHeader(),
});

// Función para manejar respuestas exitosas o errores
const handleResponse = <T>(response: AxiosResponse<T>): T => {
  return response.data;
};

const handleError = (error: AxiosError): Promise<any> => {
  if (error.response) {
    return Promise.reject(error.response.data);
  }
  return Promise.reject(error.message);
};

// Tipos para los datos de los clientes
export type Client = {
  id: number;
  first_name: string;
  last_name: string | null;
  email: string;
  phone: string | null;
  address: string | null;
  company_name: string | null;
  created_at: string;
  updated_at: string;
  last_page: number;
}

// Función para obtener la lista de clientes (GET)
export const getClients = async (
  params: Record<string, any> = {}
): Promise<any | null> => {
  try {
    const response = await api.get('/clients', { params });
    return handleResponse(response);
  } catch (error) {
    return handleError(error as AxiosError);
  }
};

// Función para obtener un cliente específico por ID (GET)
export const getClientById = async (id: number): Promise<Client> => {
  try {
    const response = await api.get(`/clients/${id}`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error as AxiosError);
  }
};

// Función para obtener el número total de clientes (GET)
export const getTotalClients = async (): Promise<number> => {
  try {
    const response = await api.get<{ total_clients: number }>('/clients/total');
    return handleResponse(response).total_clients;
  } catch (error) {
    return handleError(error as AxiosError);
  }
};

// Función para crear un cliente (POST)
export const createClient = async (clientData: any): Promise<any> => {
  try {
    const response = await api.post('/clients', clientData);
    return handleResponse(response);
  } catch (error) {
    return handleError(error as AxiosError);
  }
};

// Función para actualizar un cliente completamente (PUT)
export const updateClient = async (id: number, clientData: Partial<Client>): Promise<any> => {
  try {
    const response = await api.patch(`/clients/${id}`, clientData);
    return handleResponse(response);
  } catch (error) {
    return handleError(error as AxiosError);
  }
};

// Función para actualizar parcialmente un cliente (PATCH)
export const updatePartialClient = async (id: number, clientData: Partial<Client>): Promise<any> => {
  try {
    const response = await api.patch(`/clients/${id}`, clientData);
    return handleResponse(response);
  } catch (error) {
    return handleError(error as AxiosError);
  }
};

// Función para eliminar un cliente (DELETE)
export const deleteClient = async (id: number): Promise<void> => {
  try {
    const response = await api.delete<{ message: string }>(`/clients/${id}`);
    handleResponse(response);
  } catch (error) {
    handleError(error as AxiosError);
  }
};


export default {
  getClients,
  getClientById,
  createClient,
  updateClient,
  updatePartialClient,
  deleteClient,
  getTotalClients,
};
