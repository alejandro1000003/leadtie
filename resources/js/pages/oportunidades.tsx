import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUser, faEuroSign, faCheckCircle, faClock, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

interface Tarea {
  id: number;
  descripcion: string;
}

interface Oportunidad {
  titulo: string;
  cliente: string;
  valor: number;
  estado: 'Abierta' | 'En progreso' | 'Cerrada';
  tareas: Tarea[];
}

const Oportunidades: React.FC = () => {
  // Estado con datos de ejemplo
  const [oportunidades, setOportunidades] = useState<Oportunidad[]>([
    {
      titulo: 'Venta a Acme',
      cliente: 'Acme Corp',
      valor: 12000,
      estado: 'Abierta',
      tareas: [
        { id: 1, descripcion: 'Llamar a Acme para confirmar detalles' },
        { id: 2, descripcion: 'Enviar propuesta inicial' },
      ],
    },
    {
      titulo: 'Consultoría ERP',
      cliente: 'Globex',
      valor: 22000,
      estado: 'En progreso',
      tareas: [
        { id: 1, descripcion: 'Reunión inicial con el equipo de Globex' },
        { id: 2, descripcion: 'Enviar presupuesto detallado' },
      ],
    },
    {
      titulo: 'Mantenimiento anual',
      cliente: 'SoyTech',
      valor: 5000,
      estado: 'Cerrada',
      tareas: [
        { id: 1, descripcion: 'Realizar revisión de software' },
        { id: 2, descripcion: 'Enviar informe final' },
      ],
    },
  ]);

  const estadoIconos = {
    Abierta: faCheckCircle,
    'En progreso': faClock,
    Cerrada: faTimesCircle,
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-blue-600 hover:underline font-semibold mb-4"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Volver a Dashboard
        </Link>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Oportunidades de Venta</h2>

        <div className="space-y-4">
          {oportunidades.map((o, i) => (
            <div key={i} className="bg-white shadow overflow-hidden rounded-md">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{o.titulo}</h3>
                <div className="mt-2 text-sm text-gray-500">
                  <p className="mb-1">
                    <FontAwesomeIcon icon={faUser} className="mr-1" /> Cliente: {o.cliente}
                  </p>
                  <p className="mb-1">
                    <FontAwesomeIcon icon={faEuroSign} className="mr-1" /> Valor: {o.valor}
                  </p>
                  <p>
                  <FontAwesomeIcon icon={estadoIconos[o.estado]} className="mr-1" />Estado:
                    <span
                      className={
                        o.estado === 'Abierta'
                          ? 'text-green-500'
                          : o.estado === 'En progreso'
                          ? 'text-yellow-600'
                          : 'text-red-500'
                      }
                    >
                      {o.estado}
                    </span>
                  </p>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700">Tareas:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-500 mt-1">
                    {o.tareas.map((t) => (
                      <li key={t.id}>{t.descripcion}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Oportunidades;