import { faArrowLeft, faCheckCircle, faClock, faEuroSign, faPencilAlt, faPhone, faTimesCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { getOpportunities, updatePartialOpportunity } from '../services/opportunities-api-service'; // Importamos el servicio
import ErrorPage from './error-page';

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
};

type Opportunity = {
    id: number;
    title: string;
    client_id: string;
    value: number;
    status: 'Open' | 'In Progress' | 'Won' | 'Lost';
    client: Client;
    // tasks?: Task[];
};

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
                setOpportunities(
                    response.data.map((item: any) => ({
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
                    })),
                );
            } catch (err: any) {
                console.error('Error fetching opportunities:', err);
                setError('Failed to load opportunities.');
            } finally {
                setLoading(false);
            }
        };

        fetchOpportunities();
    }, []);

    const statusIcons = {
        Open: faCheckCircle,
        'In Progress': faClock,
        Won: faCheckCircle,
        Lost: faTimesCircle,
    };

    const handleStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>, id: number) => {
        const newStatus = event.target.value as Opportunity['status'];
        setOpportunities(opportunities.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));

        try {
            await updatePartialOpportunity(id, { status: newStatus });
            // console.log(`Opportunity ${id} status updated to: ${newStatus}`);
        } catch (error) {
            console.error(`Failed to update opportunity ${id} status:`, error);
            setError(`Failed to update opportunity ${id} status.`);
        }
    };

    if (loading) {
        return <div>Loading opportunities...</div>;
    }

    if (error) {
        return <ErrorPage />;
    }

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <Link href="/dashboard" className="mb-4 inline-flex items-center font-semibold text-blue-600 hover:underline">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back to Dashboard
                </Link>
                <h2 className="mb-6 text-2xl font-bold text-gray-900">Oportunidades</h2>
                <div className="space-y-4">
                    {opportunities.map((o) => (
                        <div key={o.id} className="relative overflow-hidden rounded-md bg-white shadow">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">{o.title}</h3>
                                <div className="mt-2 text-sm text-gray-500">
                                    <span className="mb-1 block">
                                        <FontAwesomeIcon icon={faUser} className="mr-1" /> Cliente:{' '}
                                        <Link href={`/clients?email=${encodeURI(o.client.email)}`} className="text-blue-800">
                                            {o.client.first_name} {o.client.last_name}
                                        </Link>
                                    </span>
                                    <span className="mb-1 block">
                                        <FontAwesomeIcon icon={faPhone} /> Teléfono: {o.client.phone}
                                    </span>
                                    <span className="mb-1 block">
                                        <FontAwesomeIcon icon={faEuroSign} className="mr-1" /> Valor: {o.value}
                                    </span>
                                    <span className="flex items-center">
                                        <FontAwesomeIcon icon={statusIcons[o.status]} className="mr-1" /> Estado:
                                        <span
                                            className={
                                                o.status === 'Open'
                                                    ? 'ml-1 text-green-500'
                                                    : o.status === 'In Progress'
                                                      ? 'ml-1 text-yellow-600'
                                                      : o.status === 'Won'
                                                        ? 'ml-1 text-green-700'
                                                        : o.status === 'Lost'
                                                          ? 'ml-1 text-red-700'
                                                          : 'ml-1 text-gray-500'
                                            }
                                        >
                                            {o.status}
                                        </span>
                                        <div className="relative ml-2">
                                            <FontAwesomeIcon icon={faPencilAlt} className="cursor-pointer text-blue-600" />
                                            <select
                                                value={o.status}
                                                onChange={(e) => handleStatusChange(e, o.id)}
                                                className="absolute top-0 left-0 w-full cursor-pointer opacity-0"
                                            >
                                                <option value="Open">Abierta</option>
                                                <option value="In Progress">En progreso</option>
                                                <option value="Won">Ganada</option>
                                                <option value="Lost">Perdida</option>
                                            </select>
                                        </div>
                                    </span>
                                </div>
                                {/* La sección de tareas sigue eliminada */}
                            </div>
                            {o.status !== 'Open' && o.status !== 'In Progress' && (
                                <div className="absolute top-2 right-2 flex space-x-2">
                                    {o.status === 'Won' ? (
                                        <span className="rounded bg-green-500 px-4 py-2 text-sm font-bold text-white">Venta</span>
                                    ) : o.status === 'Lost' ? (
                                        <span className="rounded bg-red-500 px-4 py-2 text-sm font-bold text-white">Perdida</span>
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
