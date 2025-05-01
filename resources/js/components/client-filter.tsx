import { faFilter, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { createClient } from '../services/client-api-service';

export const ClientFilter: React.FC = () => {
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [showAddClient, setShowAddClient] = useState<boolean>(false);

    return (
        <div className="fixed top-6 right-6 mb-5 p-1">
            <button className="ml-1 h-6 w-6 rounded bg-gray-800 font-bold text-white transition" onClick={() => setShowAddClient((prev) => !prev)}>
                {showAddClient ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faPlus} />}
            </button>

            <button className="ml-1 h-6 w-6 rounded bg-gray-800 font-bold text-white transition" onClick={() => setShowFilters((prev) => !prev)}>
                {showFilters ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faFilter} />}
            </button>

            {showFilters && (
                <div className="fixed top-10 right-6 mt-4 flex max-h-96 w-max flex-col items-start space-y-2 rounded-2xl bg-gray-800 p-5 font-bold text-white transition-all duration-500 ease-in-out">
                    <form
                        className="filters m-auto flex flex-col items-start space-y-2"
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
                        <input type="number" name="per_page" placeholder="nº de registros" className="rounded border px-2 py-1 text-sm" min="1" />
                        <input type="text" name="first_name" placeholder="Nombre" className="rounded border px-2 py-1 text-sm" />
                        <input type="text" name="last_name" placeholder="Apellido" className="rounded border px-2 py-1 text-sm" />
                        <input type="email" name="email" placeholder="Correo" className="rounded border px-2 py-1 text-sm" />
                        <input type="text" name="address" placeholder="Dirección" className="rounded border px-2 py-1 text-sm" />
                        <input type="text" name="company_name" placeholder="Empresa" className="rounded border px-2 py-1 text-sm" />
                        <input type="text" name="phone" placeholder="Teléfono" className="rounded border px-2 py-1 text-sm" />
                        <button type="submit" className="w-[100%] rounded border px-3 py-1">
                            ⌕
                        </button>
                        <button
                            type="button"
                            className="w-[100%] rounded border px-3 py-1"
                            onClick={() => {
                                window.location.href = window.location.pathname;
                            }}
                        >
                            ↻
                        </button>
                    </form>
                </div>
            )}

            {showAddClient && (
                <div className="fixed top-10 right-6 mt-4 flex max-h-96 w-max flex-col items-start space-y-2 rounded-2xl bg-gray-800 p-5 font-bold text-white transition-all duration-500 ease-in-out">
                    <form
                        className="add-client m-auto flex flex-col items-start space-y-2"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);

                            const clientData = {
                                first_name: formData.get('first_name')?.toString() || '',
                                last_name: formData.get('last_name')?.toString() || '',
                                email: formData.get('email')?.toString() || '',
                                address: formData.get('address')?.toString() || '',
                                company_name: formData.get('company_name')?.toString() || '',
                                phone: formData.get('phone')?.toString() || '',
                            };

                            try {
                                await createClient(clientData);
                                alert('Cliente creado exitosamente');
                                setShowAddClient(false);
                            } catch (error) {
                                alert('Error al crear el cliente');
                            }
                        }}
                    >
                        <input type="text" name="first_name" placeholder="Nombre" className="rounded border px-2 py-1 text-sm" required />
                        <input type="text" name="last_name" placeholder="Apellido" className="rounded border px-2 py-1 text-sm" required />
                        <input type="email" name="email" placeholder="Correo" className="rounded border px-2 py-1 text-sm" required />
                        <input type="text" name="address" placeholder="Dirección" className="rounded border px-2 py-1 text-sm" />
                        <input type="text" name="company_name" placeholder="Empresa" className="rounded border px-2 py-1 text-sm" />
                        <input type="text" name="phone" placeholder="Teléfono" className="rounded border px-2 py-1 text-sm" />
                        <button type="submit" className="w-[100%] rounded border px-3 py-1">
                            Crear Cliente
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ClientFilter;
