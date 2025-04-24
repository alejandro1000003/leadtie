import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUser, faEuroSign, faCheckCircle, faClock, faTimesCircle, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

interface Tarea {
  id: number;
  descripcion: string;
}

interface Oportunidad {
  id: number;
  titulo: string;
  cliente: string;
  valor: number;
  estado: 'Abierta' | 'En progreso' | 'Venta' | 'Perdida';
  tareas: Tarea[];
}

const Oportunidades: React.FC = () => {
  const [oportunidades, setOportunidades] = useState<Oportunidad[]>([
    {
      id: 1,
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
      id: 2,
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
      id: 3,
      titulo: 'Mantenimiento anual',
      cliente: 'SoyTech',
      valor: 5000,
      estado: 'Venta',
      tareas: [
        { id: 1, descripcion: 'Realizar revisión de software' },
        { id: 2, descripcion: 'Enviar informe final' },
      ],
    },
  ]);

  const estadoIconos = {
    'Abierta': faCheckCircle,
    'En progreso': faClock,
    'Venta': faCheckCircle,
    'Perdida': faTimesCircle,
  };

  const handleEstadoChange = (event: React.ChangeEvent<HTMLSelectElement>, id: number) => {
    const nuevoEstado = event.target.value as 'Abierta' | 'En progreso' | 'Venta' | 'Perdida';
    setOportunidades(oportunidades.map(oportunidad =>
      oportunidad.id === id ? { ...oportunidad, estado: nuevoEstado } : oportunidad
    ));
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
          {oportunidades.map((o) => (
            <div key={o.id} className="bg-white shadow overflow-hidden rounded-md relative">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{o.titulo}</h3>
                <div className="mt-2 text-sm text-gray-500">
                  <p className="mb-1">
                    <FontAwesomeIcon icon={faUser} className="mr-1" /> Cliente: {o.cliente}
                  </p>
                  <p className="mb-1">
                    <FontAwesomeIcon icon={faEuroSign} className="mr-1" /> Valor: {o.valor}
                  </p>
                  <p className="flex items-center">
                    <FontAwesomeIcon icon={estadoIconos[o.estado]} className="mr-1" /> Estado:
                    <span
                      className={
                        o.estado === 'Abierta'
                          ? 'text-green-500 ml-1'
                          : o.estado === 'En progreso'
                          ? 'text-yellow-600 ml-1'
                          : o.estado === 'Venta'
                          ? 'text-green-700 ml-1'
                          : o.estado === 'Perdida'
                          ? 'text-red-700 ml-1'
                          : 'text-gray-500 ml-1' // Estado por defecto
                      }
                    >
                      {o.estado}
                    </span>
                      <div className="relative ml-2">
                        <FontAwesomeIcon icon={faPencilAlt} className="cursor-pointer" />
                        <select
                          value={o.estado}
                          onChange={(e) => handleEstadoChange(e, o.id)}
                          className="absolute top-0 left-0 w-full opacity-0 cursor-pointer"
                        >
                          <option value="Abierta">Abierta</option>
                          <option value="En progreso">En progreso</option>
                          <option value="Venta">Venta</option>
                          <option value="Perdida">Perdida</option>
                        </select>
                      </div>
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
              {o.estado !== 'Abierta' && o.estado !== 'En progreso' && (
                <div className="absolute top-2 right-2 flex space-x-2">
                  {o.estado === 'Venta' ? (
                    <span className="bg-green-500 text-white font-bold py-2 px-4 rounded text-sm">
                      Venta
                    </span>
                  ) : o.estado === 'Perdida' ? (
                    <span className="bg-red-500 text-white font-bold py-2 px-4 rounded text-sm">
                      Perdida
                    </span>
                  ) : null}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Oportunidades;