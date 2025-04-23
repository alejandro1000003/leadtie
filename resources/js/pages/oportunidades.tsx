import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

const Oportunidades = () => {
  // Estado con datos de ejemplo
  const [oportunidades, setOportunidades] = useState([
    { titulo: 'Venta a Acme', cliente: 'Acme Corp', valor: 12000, estado: 'Abierta' },
    { titulo: 'Consultoría ERP', cliente: 'Globex', valor: 22000, estado: 'En progreso' },
    { titulo: 'Mantenimiento anual', cliente: 'SoyTech', valor: 5000, estado: 'Cerrada' },
  ]);

  return (
    <>
    {/* Filtros */}
    <nav className="mb-6 flex items-center justify-between space-x-2 border p-4 rounded-lg bg-gray-800">
    <Link href="/dashboard" className="text-blue-600 hover:underline font-semibold">
        🏠 Volver a Dashboard
    </Link>

    <form
        className="filters flex items-center space-x-4"
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
        <input
        type="number"
        name="per_page"
        placeholder="nº registros"
        className="border border-gray-400 px-2 py-1 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        min="1"
        />
        <input
        type="text"
        name="first_name"
        placeholder="Nombre"
        className="border border-gray-400 px-2 py-1 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        />
        <input
        type="text"
        name="last_name"
        placeholder="Apellido"
        className="border border-gray-400 px-2 py-1 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        />
        <input
        type="email"
        name="email"
        placeholder="Correo"
        className="border border-gray-400 px-2 py-1 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        />
        <input
        type="text"
        name="address"
        placeholder="Dirección"
        className="border border-gray-400 px-2 py-1 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        />
        <input
        type="text"
        name="company_name"
        placeholder="Empresa"
        className="border border-gray-400 px-2 py-1 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
        type="submit"
        className="border px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        ⌕
        </button>
        <button
        type="button"
        className="border px-3 py-1 rounded bg-gray-600 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        onClick={() => {
            window.location.href = window.location.pathname;
        }}
        >
        ↻
        </button>
    </form>
    </nav>

    <div className="p-6 max-w-3xl mx-auto">

      <h2 className="text-2xl font-bold mb-4 text-white">Gestión de Oportunidades</h2>

      <ul className="space-y-4">
        {oportunidades.map((o, i) => (
            <li key={i} className="bg-gray-700 p-4 rounded text-white">
            <h3 className="text-lg font-bold">{o.titulo}</h3>
            <p>Cliente: {o.cliente}</p>
            <p>Valor: €{o.valor}</p>
            <p>Estado: {o.estado}</p>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default Oportunidades;
