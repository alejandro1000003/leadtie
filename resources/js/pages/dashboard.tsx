import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Link } from '@inertiajs/react';
import Navbar from "@/components/navbar";
import { getTotalTasks } from '../services/tasks-api-service';
import { getTotalClients } from '../services/client-api-service';
import { getOpportunities } from "@/services/opportunities-api-service";

type TotalCounts = {
  tasks: number | null;
  clients: number | null;
}

type Opportunity = {
  id: number;
  title: string;
  client_id: string;
  value: number;
  status: 'Open' | 'In Progress' | 'Won' | 'Lost';
}

export default function Dashboard() {
  
  const [totalCounts, setTotalCounts] = useState<TotalCounts>({ tasks: null, clients: null});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  
  
  useEffect(() => {
    const fetchTotals = async () => {
      setLoading(true);
      setError(null);
      try {
        const [tasksCount, clientsCount] = await Promise.all([
          getTotalTasks(),
          getTotalClients(),
        ]);
        
        const opportunities_response = await getOpportunities();
        setOpportunities(opportunities_response.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          value: item.value,
          status: item.status,
        })));
        
        setTotalCounts({
          tasks: tasksCount,
          clients: clientsCount,
        });
        
      } catch (err: any) {
        console.error('Error fetching totals:', err);
        setError('No se pudieron obtener los totales. Por favor, inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTotals();
  }, []);
  
  // Generar datos para el gráfico de ventas
  const sales_chart = opportunities
    .filter(opportunity => opportunity.status === "Won")
    .map(opportunity => ({
      name: new Date().toLocaleDateString(), // Assuming current date for simplicity
      ventas: opportunity.value,
    }));

  return (
  <>
    <div className="flex flex-col md:flex-row h-screen">

      <div className="flex-wrap bg-gray-800 p-3">
        <Navbar/>
      </div>

      <div className="flex-1 bg-gray-100 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        <Card className="col-span-3">
          <CardHeader>
              <CardTitle className="text-2xl mb-2">Dashboard CRM</CardTitle>
              <CardDescription className="text-muted-foreground">Resumen general de tu actividad</CardDescription>
          </CardHeader>
        </Card>

        <Card className="col-span-3 md:col-span-1 text-center">
          <CardHeader>
            <CardTitle className="text-xl font-semibold mb-2 text-center">Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl text-[#8884d8]">
              {loading ? 'Cargando...' : totalCounts.clients !== null ? totalCounts.clients : 'Error'}
            </span>
          </CardContent>
          <CardFooter>
            <Link href="/clients" className="w-full">
              <Button variant="outline" className="mt-4 w-[80%] p-5">Ver Clientes</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="col-span-3 md:col-span-1 text-center">
          <CardHeader>
            <CardTitle className="text-xl font-semibold mb-2 text-center">Oportunidades</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl text-[#8884d8]">
            {loading ? 'Cargando...' : opportunities.filter(opportunity => opportunity.status === 'Open').length} abiertas
            </span>
          </CardContent>
          <CardFooter>
            <Link href="/opportunities" className="w-full">
              <Button variant="outline" className="mt-4 w-[80%] p-5">Ver oportunidades</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="col-span-3 md:col-span-1 text-center">
          <CardHeader>
            <CardTitle className="text-xl font-semibold mb-2 text-center">Tareas</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl text-[#8884d8]">
              {loading ? 'Cargando...' : totalCounts.tasks !== null ? `${totalCounts.tasks} pendientes` : 'Error'}
            </span>
          </CardContent>
          <CardFooter>
            <Link href="/tasks" className="w-full">
              <Button variant="outline" className="mt-4 w-[80%] p-5">Ver tareas</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="col-span-3 text-center">
          <CardHeader>
            <CardTitle className="text-xl font-semibold mb-4">Ventas Mensuales</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="90%" height={300}>
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