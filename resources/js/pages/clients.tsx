import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import apiService, { Client } from '../services/api-service';
import PaginationComponent from '../components/pagination';
import ErrorPage from './error-page';

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

            {/* Filtros */}
            <nav className="mb-6 flex items-center justify-between space-x-2 border px-2 py-2 rounded-lg bg-white">
                <Link href="/dashboard" className="text-blue-600 hover:underline font-semibold">🏠 Volver a Dashboard</Link>
                <form
                    className="filters flex items-center space-x-2 m-auto"
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
                    <button type="submit" className="border px-3 py-1 rounded">⌕</button>
                    <button type="button" className="border px-3 py-1 rounded" onClick={() => { window.location.href = window.location.pathname; }}>↻</button>
                </form>
            </nav>


            

            {/* Tabla */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
                <table className="w-full table-auto text-sm text-gray-800">
                    <thead className="bg-gray-800 text-white border-b">
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
                                <td className="px-3 py-2 text-xs text-gray-500">{client.created_at}</td>
                                <td className="px-3 py-2 text-xs text-gray-500">{client.updated_at}</td>
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