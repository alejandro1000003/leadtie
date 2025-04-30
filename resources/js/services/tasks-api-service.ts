import axios, { AxiosResponse, AxiosError } from 'axios';

// URL base de la API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

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

// Tipos para las tareas
export interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    opportunity: {
        id: number;
        title: string;
        value: number;
        status: string;
        created_at: string;
        updated_at: string;
    };
    created: string;
    updated: string;
}

// Función para obtener la lista de tareas (GET)
export const getTasks = async (
    params: Record<string, any> = {}
): Promise<any | null> => {
    try {
        const response = await api.get<Task[]>('/tasks', { params });
        return handleResponse(response);
    } catch (error) {
        return handleError(error as AxiosError);
    }
};

// Función para obtener una tarea específica por ID (GET)
export const getTaskById = async (id: number): Promise<Task> => {
    try {
        const response = await api.get(`/tasks/${id}`);
        return handleResponse(response);
    } catch (error) {
        return handleError(error as AxiosError);
    }
};

// Función para crear una tarea (POST)
export const createTask = async (taskData: Omit<Task, 'id'>): Promise<any> => {
    try {
        const response = await api.post('/tasks', taskData);
        return handleResponse(response);
    } catch (error) {
        return handleError(error as AxiosError);
    }
};

// Función para actualizar una tarea completamente (PUT)
export const updateTask = async (id: number, taskData: Task): Promise<any> => {
    try {
        const response = await api.put(`/tasks/${id}`, taskData);
        return handleResponse(response);
    } catch (error) {
        return handleError(error as AxiosError);
    }
};

// Función para actualizar parcialmente una tarea (PATCH)
export const updatePartialTask = async (id: number, taskData: Partial<Task>): Promise<any> => {
    try {
        const response = await api.patch(`/tasks/${id}`, taskData);
        return handleResponse(response);
    } catch (error) {
        return handleError(error as AxiosError);
    }
};

// Función para eliminar una tarea (DELETE)
export const deleteTask = async (id: number): Promise<any> => {
    try {
        const response = await api.delete(`/tasks/${id}`);
        return handleResponse(response);
    } catch (error) {
        return handleError(error as AxiosError);
    }
};

export default {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    updatePartialTask,
    deleteTask,
};
