import axios, { AxiosResponse, AxiosError } from 'axios';

// URL base de la API
const API_URL = import.meta.env.VITE_API_URL || 'http://leadtie-portfolio.infy.uk/api';

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

// Tipos para las oportunidades
export type Opportunity  = {
  id: number;
  title: string;
  value: number;
  status: 'Open' | 'In Progress' | 'Won' | 'Lost';
  client_id: number;
  created_at: string;
  updated_at: string;
}

// Función para obtener la lista de oportunidades (GET)
export const getOpportunities = async (
    params: Record<string, any> = {}
): Promise<any | null> => {
    try {
        const response = await api.get<Opportunity[]>('/opportunities', { params });
        return handleResponse(response);
    } catch (error) {
        return handleError(error as AxiosError);
    }
};

// Función para obtener una oportunidad específica por ID (GET)
export const getOpportunityById = async (id: number): Promise<Opportunity> => {
  try {
    const response = await api.get(`/opportunities/${id}`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error as AxiosError);
  }
};

// Función para crear una oportunidad (POST)
export const createOpportunity = async (opportunityData: Omit<Opportunity, 'id'>): Promise<any> => {
  try {
    const response = await api.post('/opportunities', opportunityData);
    return handleResponse(response);
  } catch (error) {
    return handleError(error as AxiosError);
  }
};

// Función para actualizar una oportunidad completamente (PUT)
export const updateOpportunity = async (id: number, opportunityData: Opportunity): Promise<any> => {
  try {
    const response = await api.put(`/opportunities/${id}`, opportunityData);
    return handleResponse(response);
  } catch (error) {
    return handleError(error as AxiosError);
  }
};

// Función para actualizar parcialmente una oportunidad (PATCH)
export const updatePartialOpportunity = async (id: number, opportunityData: Partial<Opportunity>): Promise<any> => {
  try {
    const response = await api.patch(`/opportunities/${id}`, opportunityData);
    return handleResponse(response);
  } catch (error) {
    return handleError(error as AxiosError);
  }
};

// Función para eliminar una oportunidad (DELETE)
export const deleteOpportunity = async (id: number): Promise<any> => {
  try {
    const response = await api.delete(`/opportunities/${id}`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error as AxiosError);
  }
};

export default {
  getOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  updatePartialOpportunity,
  deleteOpportunity,
};
