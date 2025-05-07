import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "@inertiajs/react";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { getTasks, updatePartialTask } from '../services/tasks-api-service'; // Importa tu servicio y la definición de Task
import ErrorPage from "./error-page";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  opportunity: string;
  created: string;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        // Mapeamos la respuesta de tu servicio a la estructura que usa TaskManager
        const mappedTasks: Task[] = response.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          completed: item.completed === 1, // Convertimos el 0/1 a booleano
          opportunity: item.opportunity.title, // Asumiendo que solo quieres mostrar el título de la oportunidad
          created: item.created_at,
        }));
        setTasks(mappedTasks);
      } catch (err: any) {
        setError('Error al cargar las tareas');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const toggleComplete = async (id: number) => {
    const updatedTask = tasks?.find(task => task.id === id);
    if (!updatedTask) return;

    const updatedCompletedStatus = !updatedTask.completed;

    try {
      await updatePartialTask(id, { completed: updatedCompletedStatus });
      setTasks(prevTasks =>
        prevTasks ? prevTasks.map(task =>
          task.id === id ? { ...task, completed: updatedCompletedStatus } : task
        ) : []
      );
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
    }
  };

  if (loading) {
    return <div>Cargando tareas...</div>;
  }

  if (error) {
      return <ErrorPage />;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center text-blue-600 hover:underline font-semibold mb-4">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Volver a Dashboard
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">Gestión de Tareas del CRM</h1>

        <div className="space-y-4">
          {tasks && tasks.map((task) => (
            <Card
              key={task.id}
              onClick={() => toggleComplete(task.id)}
              className="bg-white shadow overflow-hidden rounded-md cursor-pointer hover:bg-gray-50 transition"
            >
              <div className="px-4 py-5 sm:p-6 flex items-start gap-4">
                <div className="flex items-center">
                  <Checkbox
                    className="h-5 w-5 accent-blue-500 pointer-events-none"
                    checked={task.completed}
                    onChange={() => {}}
                  />
                </div>
                <div className="flex-1">
                  <div
                    className={`text-lg font-medium ${
                      task.completed ? "line-through text-gray-400" : "text-gray-900"
                    }`}
                  >
                    {task.title}
                  </div>
                  <span className={`mt-1 text-sm text-gray-500 ${task.completed ? "line-through" : ""}`}>
                    {task.description}
                  </span>
                  <div className="mt-2 text-sm text-gray-500">
                    <span className="block">
                      <strong>Oportunidad:</strong> {task.opportunity}
                    </span>
                    <span className="block">
                      <strong>Creado:</strong> {new Date(task.created).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="ml-2">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.completed ? 'Completado' : 'Por hacer'}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}