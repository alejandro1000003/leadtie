import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faUser,
  faEuroSign,
  faCheckCircle,
  faClock,
  faTimesCircle,
  faPencilAlt,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { getOpportunities } from '../services/opportunities-api-service'; // Importamos el servicio

type Client = {
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

type Opportunity = {
  id: number;
  title: string;
  client_id: string;
  value: number;
  status: 'Open' | 'In Progress' | 'Won' | 'Lost';
  client: Client;
  // tasks?: Task[]; // Si en algún momento vuelves a necesitar las tareas, puedes dejar esto opcional
}


const Opportunities: React.FC = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true); // Estado para indicar la carga
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getOpportunities();
        console.log("Fetched opportunities:", response.data);
        setOpportunities(response.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          client_id: item.client_id?.toString() || '', // Aseguramos que client_id sea string
          value: item.value,
          status: item.status,
          client: {
            id: item.client.id,
            first_name: item.client.first_name,
            last_name: item.client.last_name,
            email: item.client.email,
            phone: item.client.phone,
            address: item.client.address,
            company_name: item.client.company_name,
            created_at: item.client.created_at,
            updated_at: item.client.updated_at,
          },
        })));

      } catch (err: any) {
        console.error("Error fetching opportunities:", err);
        setError("Failed to load opportunities.");
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

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
    // Aquí iría la lógica para actualizar el estado en el backend
    console.log(`Opportunity ${id} status changed to: ${newStatus}`);
  };

  if (loading) {
    return <div>Loading opportunities...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
                    <FontAwesomeIcon icon={faUser} className="mr-1" /> Cliente:  <Link href={`/clients?email=${encodeURI(o.client.email)}`} className="text-blue-800">{o.client.first_name} {o.client.last_name}</Link> 
                  </p>
                  <p className="mb-1">
                  <FontAwesomeIcon icon={faPhone}/> Teléfono: {o.client.phone}
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
                      <FontAwesomeIcon icon={faPencilAlt} className="cursor-pointer text-blue-600" />
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
                {/* La sección de tareas sigue eliminada */}
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