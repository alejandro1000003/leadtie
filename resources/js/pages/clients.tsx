import { faArrowLeft,faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { ClientFilter } from '../components/client-filter';
import PaginationComponent from '../components/pagination';
import apiService, { Client } from '../services/client-api-service';
import {openPatchClientModal} from '../components/patch-client'; 

const ErrorPage = React.lazy(() => import('./error-page'));

const formatearFecha = (f: string) => {
    const d = new Date(f);
    return `${d.getUTCDate().toString().padStart(2, '0')}-${(d.getUTCMonth() + 1).toString().padStart(2, '0')}-${d.getUTCFullYear()}`;
};

const ClientsList: React.FC = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        const fetchClients = async () => {
            setLoading(true);
            try {
                const queryParams = new URLSearchParams(window.location.search);
                const perPage = queryParams.get('per_page') || '15';
                const page = parseInt(queryParams.get('page') || '1');
                const first_name = queryParams.get('first_name') || '';
                const last_name = queryParams.get('last_name') || '';
                const email = queryParams.get('email') || '';
                const address = queryParams.get('address') || '';
                const company_name = queryParams.get('company_name') || '';

                const data = await apiService.getClients({
                    per_page: parseInt(perPage),
                    page,
                    first_name,
                    last_name,
                    email,
                    address,
                    company_name,
                });

                if (!data) {
                    setError('No se pudo obtener la lista de clientes');
                    return;
                }

                setClients(data.data);
                setCurrentPage(data.current_page);
                setTotalPages(data.last_page);
            } catch (err: any) {
                alert('Error al eliminar cliente');
                setError(err.message || 'Error fetching clients');
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    if (error) return <ErrorPage />;

    return (
        <div className="mx-auto h-[100vh] bg-gray-100 p-6">
            {loading && <p className="text-gray-600">Cargando clientes...</p>}

            <Link href="/dashboard" className="font-semibold text-blue-600 hover:underline">
                <FontAwesomeIcon icon={faArrowLeft} /> Volver a Dashboard
            </Link>

            {/* Filtros y Título */}
            <ClientFilter />
            <h2 className="mt-3 text-2xl font-bold text-gray-900">Clientes</h2>
            <div className="mt-2 flex items-center text-red-600">
                <FontAwesomeIcon icon={faTriangleExclamation} className="mr-2" />
                <span className="font-semibold">Solo los administradores pueden modificar o eliminar clientes</span>
            </div>
            {/* Tabla */}
            <div className="mt-3 overflow-x-auto border rounded-[6px] border-gray-200 bg-white">
                <table className="w-full table-auto">
                    <thead className="border-b bg-[#8884d8] text-white">
                        <tr>
                            <th className="px-0 py-0 text-left text-[10px] sm:text-sm sm:p-2">Nombre</th>
                            <th className="px-0 py-0 text-left text-[10px] sm:text-sm sm:p-2">Email</th>
                            <th className="px-0 py-0 text-left text-[10px] sm:text-sm sm:p-2">Teléfono</th>
                            <th className="hidden px-0 py-0 text-left text-[10px] sm:table-cell sm:text-sm sm:p-2">Dirección</th>
                            <th className="px-0 py-0 text-left text-[10px] sm:text-sm sm:p-2">Compañía</th>
                            <th className="hidden px-0 py-0 text-left text-[10px] sm:table-cell sm:text-sm sm:p-2">Creado</th>
                            <th className="px-0 py-0 text-left text-[10px] sm:text-sm sm:p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client, index) => (
                            <tr key={client.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-0 py-0 text-[10px] sm:px-2 sm:py-3 sm:text-xs">{client.first_name}</td>
                                <td className="px-0 py-0 text-[10px] sm:px-2 sm:py-3 sm:text-xs">{client.email}</td>
                                <td className="px-0 py-0 text-[10px] sm:px-2 sm:py-3 sm:text-xs">{client.phone}</td>
                                <td className="hidden px-0 py-0 text-[10px] sm:table-cell sm:px-2 sm:py-3 sm:text-xs">{client.address}</td>
                                <td className="px-0 py-0 text-[10px] sm:px-2 sm:py-3 sm:text-xs">{client.company_name}</td>
                                <td className="collapsible hidden px-0 py-0 text-[10px] text-gray-500 sm:table-cell sm:text-xs">
                                    {formatearFecha(client.created_at)}
                                </td>
                                <td className="space-x-2 px-0 py-0 text-xs sm:text-sm">
                                    <button
                                        className="text-blue-600 transition hover:scale-110"
                                        onClick={() => openPatchClientModal({
                                            id: client.id,
                                            first_name: client.first_name,
                                            last_name: client.last_name || '',
                                            email: client.email,
                                            phone: client.phone || '',
                                            address: client.address || '',
                                            company_name: client.company_name || '',
                                        })}
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        className="text-red-600 transition hover:scale-110"
                                        onClick={async () => {
                                            await apiService.deleteClient(client.id);
                                            router.visit('/clients');

                                        }}
                                    >
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <PaginationComponent currentPage={currentPage} totalPages={totalPages} />
        </div>
    );
};

export default ClientsList;
