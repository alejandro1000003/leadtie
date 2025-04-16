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
        <div>

            {loading && <p>Loading clients...</p>}
            {error && <p>Error: {error}</p>}
            
            <nav className="w-full mb-4 flex justify-between items-center">
                <Link
                    href="/dashboard"
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                    🏠 Volver a Dashboard
                </Link>
                
            </nav>

            <div className="overflow-x-auto">
                <table className="table-auto border-collapse text-center mx-auto font-semibold text-sm">
                    <thead>
                        <tr className="bg-black text-white">
                            <th className="border py-1 text-center">ID</th>
                            <th className="border py-1 text-center">Nombre</th>
                            <th className="border py-1 text-center">Apellido</th>
                            <th className="border py-1 text-center">Email</th>
                            <th className="border py-1 text-center">Teléfono</th>
                            <th className="border py-1 text-center">Dirección</th>
                            <th className="border py-1 text-center">Compañía</th>
                            <th className="border py-1 text-center">Creado</th>
                            <th className="border py-1 text-center">Actualizado</th>
                            <th className="border py-1 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente, index) => (
                            <tr
                                key={cliente.id}
                                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                            >
                                <td className="px-4 py-1 text-[#8884d8] font-bold">
                                    {cliente.id}
                                </td>
                                <td className="px-4 py-1 text-[#8884d8] font-bold">
                                    {cliente.first_name}
                                </td>
                                <td className="px-4 py-1 text-[#8884d8] font-bold">
                                    {cliente.last_name}
                                </td>
                                <td className="px-4 py-1 text-[#8884d8] font-bold">
                                    {cliente.email}
                                </td>
                                <td className="px-4 py-1 text-[#8884d8] font-bold">
                                    {cliente.phone}
                                </td>
                                <td className="px-4 py-1 text-[#8884d8] font-bold">
                                    {cliente.address}
                                </td>
                                <td className="px-4 py-1 text-[#8884d8] font-bold">
                                    {cliente.company_name}
                                </td>
                                <td className="px-4 py-1 text-[#8884d8] font-bold">
                                    {cliente.created_at}
                                </td>
                                <td className="px-4 py-1 text-[#8884d8] font-bold">
                                    {cliente.updated_at}
                                </td>
                                <td className="px-4 py-1 text-center">
                                {cliente.last_page}
                                    <button
                                        className=""
                                        // onClick={() => handleEdit(cliente.id)}
                                    >
                                        📝
                                    </button>
                                    <button
                                        className=""
                                        // onClick={() => handleDelete(cliente.id)}
                                    >
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-4 flex justify-center items-center">
                    <button
                        className="px-4 py-2 mx-1 bg-blue-500 text-white rounded hover:bg-blue-700"
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
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                        <button
                            key={pageNumber}
                            className={`px-4 py-2 mx-1 rounded ${
                                pageNumber === currentPage
                                    ? 'bg-blue-700 text-white'
                                    : 'bg-gray-200 text-black hover:bg-gray-400'
                            }`}
                            onClick={() => {
                                const queryParams = new URLSearchParams(window.location.search);
                                queryParams.set('page', pageNumber.toString());
                                window.location.href = `${window.location.pathname}?${queryParams.toString()}`;
                            }}
                        >
                            {pageNumber}
                        </button>
                    ))}
                    <button
                        className="px-4 py-2 mx-1 bg-blue-500 text-white rounded hover:bg-blue-700"
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

        </div>
    );
};

export default ClientesList;