import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Link } from '@inertiajs/react';
import Navbar from "@/components/navbar";

const sales_chart = [
  { name: "Ene", ventas: 4000 },
  { name: "Feb", ventas: 3000 },
  { name: "Mar", ventas: 5000 },
  { name: "Abr", ventas: 2000 },
];

export default function Dashboard() {
  return (
  <>
    <div className="flex w-full p-4 flex-col md:flex-row min-h-screen">
      <div className="flex-wrap bg-black p-5">
        <Navbar/>
      </div>
      
      <div className="flex-1 bg-gray-100 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        <Card className="col-span-3">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-2">Dashboard CRM</h1>
            <p className="text-muted-foreground">Resumen general de tu actividad</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Clientes</h2>
            <p className="text-3xl font-bold text-[#8884d8]">152</p>
            <Link href="/clientes">
              <Button variant="outline" className="mt-4 w-full">Ver clientes</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Oportunidades</h2>
            <p className="text-3xl font-bold text-[#8884d8]">26 abiertas</p>
            <Link href="/oportunidades">
              <Button variant="outline" className="mt-4 w-full">Ver oportunidades</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Tareas</h2>
            <p className="text-3xl font-bold text-[#8884d8]">12 pendientes</p>
            <Link href="/tareas">
              <Button variant="outline" className="mt-4 w-full">Ver tareas</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="col-span-3 ">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Ventas Mensuales</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sales_chart}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="ventas" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>
    </div>
  </>
  );
}

// import { useEffect, useState } from 'react';
// import apiService, { Client } from '../../services/api-service';

// const Dashboard: React.FC = () => {
  //   const [clients, setClients] = useState<Client[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // Cargar la lista de clientes cuando el componente se monte
//   useEffect(() => {
//     const fetchClients = async () => {
//       setLoading(true);
//       try {
//         const data = await apiService.getClients({ per_page: 5 });
//         setClients(data.data);
//       } catch (error: any) {
//         setError(error.message || 'Error fetching clients');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClients();
//   }, []); // Se ejecuta una sola vez al montar el componente

//   return (
//     <div>
//       <h1>Bienvenido al Dashboard</h1>
      
//       {loading && <p>Loading clients...</p>}
//       {error && <p>Error: {error}</p>}
      
//       <h2>Clientes</h2>
//       <ul>
//         {clients.map((client) => (
//           <li key={client.id}>
//             {client.first_name} {client.last_name} - {client.email}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Dashboard;
