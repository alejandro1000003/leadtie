import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "@inertiajs/react";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function TaskManager() {
  const tasks = [
    {
      id: 1,
      title: "Llamar a cliente",
      description: "Confirmar detalles de la propuesta",
      completed: false,
      client: "Cliente A",
      opportunity: "Oportunidad 1",
    },
    {
      id: 2,
      title: "Enviar propuesta",
      description: "Enviar propuesta con condiciones acordadas",
      completed: true,
      client: "Cliente B",
      opportunity: "Oportunidad 2",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Enlace al Dashboard */}
        <Link href="/dashboard" className="inline-flex items-center text-blue-600 hover:underline font-semibold mb-4">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Volver a Dashboard
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">Gestión de Tareas del CRM</h1>

        {/* Sección de tareas */}
        <div className="space-y-4">
          {tasks.map(({ id, title, description, completed, client, opportunity }) => (
            <Card key={id} className="bg-white shadow overflow-hidden rounded-md">
              <div className="px-4 py-5 sm:p-6 flex items-start gap-4">
                <div className="flex items-center">
                  <Checkbox id={`task-${id}`} className="h-5 w-5 accent-blue-500 cursor-pointer" checked={completed} />
                </div>
                <div className="flex-1">
                  <label htmlFor={`task-${id}`} className={`block text-lg font-medium text-gray-900 ${completed ? "line-through text-gray-400" : ""}`}>
                    {title}
                  </label>
                  <p className={`mt-1 text-sm text-gray-500 ${completed ? "line-through" : ""}`}>{description}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    <p><strong>Cliente:</strong> {client}</p>
                    <p><strong>Oportunidad:</strong> {opportunity}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}