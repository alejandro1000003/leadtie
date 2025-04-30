import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import apiService, { Client } from '../services/client-api-service';
import PaginationComponent from '../components/pagination';
import ErrorPage from './error-page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faFilter, faXmark } from '@fortawesome/free-solid-svg-icons';

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
    const [showFilters, setShowFilters] = useState<boolean>(false);

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
                    company_name
                });

                if (!data) {
                    setError('No se pudo obtener la lista de clientes');
                    return;
                }

                setClients(data.data);
                setCurrentPage(data.current_page);
                setTotalPages(data.last_page);

            } catch (err: any) {
                setError(err.message || 'Error fetching clients');
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    if (error) return <ErrorPage />;

    return (
        <div className="p-6 mx-auto h-[100vh] bg-gray-100">
            {loading && <p className="text-gray-600">Cargando clientes...</p>}

            <Link href="/dashboard" className="text-blue-600 hover:underline font-semibold"><FontAwesomeIcon icon={faArrowLeft} /> Volver a Dashboard</Link>
            {/* Filtros */}
            <div className="mb-5 fixed top-3 right-6">
            <button
                className="bg-gray-800 text-white px-2 py-2 rounded font-bold transition flex items-center"
                onClick={() => setShowFilters((prev) => !prev)}
            >
                
                {showFilters ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faFilter} />}
            </button>
            {showFilters && (
                <nav className="bg-gray-800 mt-4 flex flex-col items-start space-y-2 text-white font-bold max-h-96 transition-all rounded-2xl w-max p-5 duration-500 ease-in-out fixed top-10 right-6">
                <form
                    className="filters flex flex-col items-start space-y-2 m-auto"
                    onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const queryParams = new URLSearchParams();

                    formData.forEach((value, key) => {
                        if (value) {
                        queryParams.set(key, value.toString());
                        }
                    });

                    window.location.href = `${window.location.pathname}?${queryParams.toString()}`;
                    }}
                >
                    <input type="number" name="per_page" placeholder="nº de registros" className="border px-2 py-1 text-sm rounded" min="1" />
                    <input type="text" name="first_name" placeholder="Nombre" className="border px-2 py-1 text-sm rounded" />
                    <input type="text" name="last_name" placeholder="Apellido" className="border px-2 py-1 text-sm rounded" />
                    <input type="email" name="email" placeholder="Correo" className="border px-2 py-1 text-sm rounded" />
                    <input type="text" name="address" placeholder="Dirección" className="border px-2 py-1 text-sm rounded" />
                    <input type="text" name="company_name" placeholder="Empresa" className="border px-2 py-1 text-sm rounded" />
                    <button type="submit" className="border px-3 py-1 rounded w-[100%]">⌕</button>
                    <button type="button" className="border px-3 py-1 rounded w-[100%]" onClick={() => { window.location.href = window.location.pathname; }}>↻</button>
                </form>
                </nav>
            )}
            </div>


            

            {/* Tabla */}
            <div className="overflow-x-auto border border-gray-200 bg-white mt-3">
                <table className="w-full table-auto text-sm      ">
                    <thead className="bg-[#8884d8] text-white border-b ">
                        <tr>
                            {['ID', 'Nombre', 'Apellido', 'Email', 'Teléfono', 'Dirección', 'Compañía', 'Creado', 'Actualizado', 'Acciones'].map((col) => (
                                <th key={col} className="px-3 py-2 text-left font-semibold">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client, index) => (
                            <tr key={client.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-3 py-2">{client.id}</td>
                                <td className="px-3 py-2">{client.first_name}</td>
                                <td className="px-3 py-2">{client.last_name}</td>
                                <td className="px-3 py-2">{client.email}</td>
                                <td className="px-3 py-2">{client.phone}</td>
                                <td className="px-3 py-2">{client.address}</td>
                                <td className="px-3 py-2">{client.company_name}</td>
                                <td className="px-3 py-2 text-xs text-gray-500 collapsible">{formatearFecha(client.created_at)}</td>
                                <td className="px-3 py-2 text-xs text-gray-500 collapsible">{formatearFecha(client.updated_at)}</td>
                                <td className="px-3 py-2 space-x-2">
                                    <button className="text-blue-600 hover:scale-110 transition">📝</button>
                                    <button className="text-red-600 hover:scale-110 transition">🗑️</button>
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