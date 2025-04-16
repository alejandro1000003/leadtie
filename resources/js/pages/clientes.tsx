import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import apiService, { Client, PaginatedClients } from '../services/api-service';

const ClientesList: React.FC = () => {
    const [clientes, setClientes] = useState<Client[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        const fetchClientes = async () => {
            setLoading(true);
            try {
                const queryParams = new URLSearchParams(window.location.search);
                const perPage = queryParams.get('per_page') || '15';
                const page = parseInt(queryParams.get('page') || '1');

                const data = await apiService.getClients({ per_page: parseInt(perPage), page });

                if (!data) {
                    setError('No se pudo obtener la lista de clientes');
                    return;
                }

                setClientes(data.data);
                setCurrentPage(data.current_page);
                setTotalPages(data.last_page);
            } catch (error: any) {
                setError(error.message || 'Error fetching clients');
            } finally {
                setLoading(false);
            }
        };

        fetchClientes();
    }, []);

    return (
        <div className="p-6 mx-auto">
            {loading && <p className="text-gray-600">Cargando clientes...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            <nav className="mb-6">
                <Link
                    href="/dashboard"
                    className="text-blue-600 hover:underline font-semibold"
                >
                    🏠 Volver a Dashboard
                </Link>
            </nav>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full table-auto text-sm text-gray-800">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            {['ID', 'Nombre', 'Apellido', 'Email', 'Teléfono', 'Dirección', 'Compañía', 'Creado', 'Actualizado', 'Acciones'].map((col) => (
                                <th key={col} className="px-3 py-2 text-left font-semibold">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente, index) => (
                            <tr
                                key={cliente.id}
                                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                            >
                                <td className="px-3 py-2">{cliente.id}</td>
                                <td className="px-3 py-2">{cliente.first_name}</td>
                                <td className="px-3 py-2">{cliente.last_name}</td>
                                <td className="px-3 py-2">{cliente.email}</td>
                                <td className="px-3 py-2">{cliente.phone}</td>
                                <td className="px-3 py-2">{cliente.address}</td>
                                <td className="px-3 py-2">{cliente.company_name}</td>
                                <td className="px-3 py-2 text-xs text-gray-500">{cliente.created_at}</td>
                                <td className="px-3 py-2 text-xs text-gray-500">{cliente.updated_at}</td>
                                <td className="px-3 py-2 space-x-2">
                                    <button className="text-blue-600 hover:scale-110 transition">📝</button>
                                    <button className="text-red-600 hover:scale-110 transition">🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 flex justify-center gap-2 flex-wrap">
                <button
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                    onClick={() => {
                        if (currentPage > 1) {
                            const queryParams = new URLSearchParams(window.location.search);
                            queryParams.set('page', (currentPage - 1).toString());
                            window.location.href = `${window.location.pathname}?${queryParams.toString()}`;
                        }
                    }}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                    <button
                        key={num}
                        className={`px-3 py-1 rounded ${
                            num === currentPage
                                ? 'bg-blue-700 text-white'
                                : 'bg-gray-200 text-black hover:bg-gray-400'
                        }`}
                        onClick={() => {
                            const queryParams = new URLSearchParams(window.location.search);
                            queryParams.set('page', num.toString());
                            window.location.href = `${window.location.pathname}?${queryParams.toString()}`;
                        }}
                    >
                        {num}
                    </button>
                ))}
                <button
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                    onClick={() => {
                        if (currentPage < totalPages) {
                            const queryParams = new URLSearchParams(window.location.search);
                            queryParams.set('page', (currentPage + 1).toString());
                            window.location.href = `${window.location.pathname}?${queryParams.toString()}`;
                        }
                    }}
                    disabled={currentPage === totalPages}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default ClientesList;
