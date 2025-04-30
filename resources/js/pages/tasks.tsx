import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "@inertiajs/react";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  opportunity: string;
  created: string;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Llamar a cliente",
      description: "Confirmar detalles de la propuesta",
      completed: false,
      opportunity: "Oportunidad 1",
      created: "2023-10-01", // Example date
    },
    {
      id: 2,
      title: "Enviar propuesta",
      description: "Enviar propuesta con condiciones acordadas",
      completed: true,
      opportunity: "Oportunidad 2",
      created: "2023-09-28", // Example date
    },
  ]);

  const toggleComplete = (id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center text-blue-600 hover:underline font-semibold mb-4">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Volver a Dashboard
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">Gestión de Tareas del CRM</h1>

        <div className="space-y-4">
          {tasks.map((task) => (
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
                  <p className={`mt-1 text-sm text-gray-500 ${task.completed ? "line-through" : ""}`}>
                    {task.description}
                  </p>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>
                      <strong>Oportunidad:</strong> {task.opportunity}
                    </p>
                    <p>
                      <strong>Creado:</strong> {task.created}
                    </p>
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