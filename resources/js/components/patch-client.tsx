import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { createRoot } from 'react-dom/client';
import apiService, { Client } from '../services/client-api-service';

interface PatchClientModalProps {
    client: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        address: string;
        company_name: string;
    };
}

const PatchClientModal: React.FC<PatchClientModalProps> = ({ client }) => {
    const handleClose = () => {
        const modal = document.getElementById('patch-client-modal');
        if (modal) {
            const root = createRoot(modal);
            root.unmount();
            document.body.removeChild(modal);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const updatedClient = {
            first_name: formData.get('first_name') as string,
            last_name: formData.get('last_name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            address: formData.get('address') as string,
            company_name: formData.get('company_name') as string,
        };
        await apiService.updateClient(client.id, updatedClient);
        handleClose();
        window.location.reload();
    };

    return (
        <div id="patch-client-modal" className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-gray-100">
            <div className="relative rounded bg-white w-[50vh] p-10 shadow-lg">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={handleClose}>
                <FontAwesomeIcon icon={faXmark} />
            </button>
            <h2 className="text-lg font-semibold mb-4">Editar Cliente</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                    type="text"
                    name="first_name"
                    defaultValue={client.first_name}
                    className="mt-1 block w-full p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                </div>
                <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Apellido</label>
                <input
                    type="text"
                    name="last_name"
                    defaultValue={client.last_name}
                    className="mt-1 block w-full p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                </div>
                <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    name="email"
                    defaultValue={client.email}
                    className="mt-1 block w-full p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                </div>
                <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input
                    type="text"
                    name="phone"
                    defaultValue={client.phone}
                    className="mt-1 block w-full p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                </div>
                <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Dirección</label>
                <input
                    type="text"
                    name="address"
                    defaultValue={client.address}
                    className="mt-1 block w-full p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                </div>
                <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Compañía</label>
                <input
                    type="text"
                    name="company_name"
                    defaultValue={client.company_name}
                    className="mt-1 block w-full p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                </div>
                <div className="flex justify-end">
                <button
                    type="button"
                    onClick={handleClose}
                    className="mr-2 p-2 border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="p-2 bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                >
                    Guardar
                </button>
                </div>
            </form>
            </div>
        </div>
    );
};

export const openPatchClientModal = (client: PatchClientModalProps['client']) => {
    const modal = document.createElement('div');
    modal.id = 'patch-client-modal';
    document.body.appendChild(modal);

    const root = createRoot(modal);

    root.render(<PatchClientModal client={client} />);
};
