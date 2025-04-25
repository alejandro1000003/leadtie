import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faUser,
  faEuroSign,
  faCheckCircle,
  faClock,
  faTimesCircle,
  faPencilAlt
} from '@fortawesome/free-solid-svg-icons';

interface Task {
  id: number;
  description: string;
}

interface Opportunity {
  id: number;
  title: string;
  client: string;
  value: number;
  status: 'Open' | 'In Progress' | 'Won' | 'Lost';
  tasks: Task[];
}

const Opportunities: React.FC = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([
    {
      id: 1,
      title: 'Sale to Acme',
      client: 'Acme Corp',
      value: 12000,
      status: 'Open',
      tasks: [
        { id: 1, description: 'Call Acme to confirm details' },
        { id: 2, description: 'Send initial proposal' },
      ],
    },
    {
      id: 2,
      title: 'ERP Consulting',
      client: 'Globex',
      value: 22000,
      status: 'In Progress',
      tasks: [
        { id: 1, description: 'Initial meeting with Globex team' },
        { id: 2, description: 'Send detailed budget' },
      ],
    },
    {
      id: 3,
      title: 'Annual Maintenance',
      client: 'SoyTech',
      value: 5000,
      status: 'Won',
      tasks: [
        { id: 1, description: 'Perform software review' },
        { id: 2, description: 'Send final report' },
      ],
    },
  ]);

  const statusIcons = {
    'Open': faCheckCircle,
    'In Progress': faClock,
    'Won': faCheckCircle,
    'Lost': faTimesCircle,
  };

  const handleStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    id: number
  ) => {
    const newStatus = event.target.value as Opportunity['status'];
    setOpportunities(opportunities.map(o =>
      o.id === id ? { ...o, status: newStatus } : o
    ));
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-blue-600 hover:underline font-semibold mb-4"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back to Dashboard
        </Link>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Sales Opportunities</h2>
        <div className="space-y-4">
          {opportunities.map((o) => (
            <div key={o.id} className="bg-white shadow overflow-hidden rounded-md relative">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{o.title}</h3>
                <div className="mt-2 text-sm text-gray-500">
                  <p className="mb-1">
                    <FontAwesomeIcon icon={faUser} className="mr-1" /> Cliente: {o.client}
                  </p>
                  <p className="mb-1">
                    <FontAwesomeIcon icon={faEuroSign} className="mr-1" /> Valor: {o.value}
                  </p>
                  <p className="flex items-center">
                    <FontAwesomeIcon icon={statusIcons[o.status]} className="mr-1" /> Estado:
                    <span
                      className={
                        o.status === 'Open'
                          ? 'text-green-500 ml-1'
                          : o.status === 'In Progress'
                          ? 'text-yellow-600 ml-1'
                          : o.status === 'Won'
                          ? 'text-green-700 ml-1'
                          : o.status === 'Lost'
                          ? 'text-red-700 ml-1'
                          : 'text-gray-500 ml-1'
                      }
                    >
                      {o.status}
                    </span>
                    <div className="relative ml-2">
                      <FontAwesomeIcon icon={faPencilAlt} className="cursor-pointer" />
                      <select
                        value={o.status}
                        onChange={(e) => handleStatusChange(e, o.id)}
                        className="absolute top-0 left-0 w-full opacity-0 cursor-pointer"
                      >
                        <option value="Open">Abierta</option>
                        <option value="In Progress">En progreso</option>
                        <option value="Won">Ganada</option>
                        <option value="Lost">Perdida</option>
                      </select>
                    </div>
                  </p>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700">Tareas:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-500 mt-1">
                    {o.tasks.map((t) => (
                      <li key={t.id}>{t.description}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {o.status !== 'Open' && o.status !== 'In Progress' && (
                <div className="absolute top-2 right-2 flex space-x-2">
                  {o.status === 'Won' ? (
                    <span className="bg-green-500 text-white font-bold py-2 px-4 rounded text-sm">
                      Venta
                    </span>
                  ) : o.status === 'Lost' ? (
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

export default Opportunities;
