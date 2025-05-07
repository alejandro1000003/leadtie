import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Link } from '@inertiajs/react';
import Navbar from "@/components/navbar";
import { getTotalTasks } from '../services/tasks-api-service';
import { getTotalClients } from '../services/client-api-service';
import { getOpportunities } from "@/services/opportunities-api-service";
import ErrorPage from './error-page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faListCheck, faChartBar, faArrowRight, faHandshake, faCoins, faTimesCircle } from '@fortawesome/free-solid-svg-icons'; // Importa más iconos

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

type OpportunityStatusCounts = {
  open: number;
  inProgress: number;
  won: number;
  lost: number;
}

export default function Dashboard() {

  const [totalCounts, setTotalCounts] = useState<TotalCounts>({ tasks: null, clients: null});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [opportunityStatusCounts, setOpportunityStatusCounts] = useState<OpportunityStatusCounts>({
    open: 0,
    inProgress: 0,
    won: 0,
    lost: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [tasksCount, clientsCount, opportunitiesResponse] = await Promise.all([
          getTotalTasks(),
          getTotalClients(),
          getOpportunities(),
        ]);
        setTotalCounts({
          tasks: tasksCount,
          clients: clientsCount,
        });
        setOpportunities(opportunitiesResponse.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          value: item.value,
          status: item.status,
        })));

        // Contar las oportunidades por estado
        const statusCounts: OpportunityStatusCounts = {
          open: opportunitiesResponse.data.filter((op: any) => op.status === 'Open').length,
          inProgress: opportunitiesResponse.data.filter((op: any) => op.status === 'In Progress').length,
          won: opportunitiesResponse.data.filter((op: any) => op.status === 'Won').length,
          lost: opportunitiesResponse.data.filter((op: any) => op.status === 'Lost').length,
        };
        setOpportunityStatusCounts(statusCounts);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError("Error fetching dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Generar datos para el gráfico de ventas
  const sales_chart = opportunities
    .filter(opportunity => opportunity.status === "Won")
    .map(opportunity => ({
      name: new Date().toLocaleDateString(), // Assuming current date for simplicity
      ventas: opportunity.value,
    }));

  if (error) {
    return <ErrorPage />;
  }

  return (
  <>
    <div className="flex flex-col md:flex-row h-screen">

      <div className="flex-wrap bg-gray-800 p-3">
        <Navbar/>
      </div>

      <div className="flex-1 bg-gray-100 p-6 grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Panel de Título Principal */}
        <Card className="col-span-1 md:col-span-3 rounded-md">
          <CardHeader>
              <CardTitle className="text-2xl font-semibold">Panel de Control</CardTitle>
              <CardDescription className="text-muted-foreground">Vista general de tu negocio</CardDescription>
          </CardHeader>
        </Card>

        {/* Tarjeta de Clientes */}
        <Card className="text-center rounded-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center justify-center gap-2"><FontAwesomeIcon icon={faUsers} className="w-5 h-5 text-[#8884d8]" /> Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-[#8884d8]">
              {loading ? 'Cargando...' : totalCounts.clients !== null ? totalCounts.clients : 'Error'}
            </span>
          </CardContent>
          <CardFooter>
            <Link href="/clients" className="w-full">
              <Button variant="outline" className="mt-4 w-full rounded-md">Ver Clientes <FontAwesomeIcon icon={faArrowRight} className="ml-2" /></Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Tarjeta de Tareas Pendientes */}
        <Card className="text-center rounded-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center justify-center gap-2"><FontAwesomeIcon icon={faListCheck} className="w-5 h-5 text-orange-500" /> Tareas Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-orange-500">
              {loading ? 'Cargando...' : totalCounts.tasks !== null ? totalCounts.tasks : 'Error'}
            </span>
          </CardContent>
          <CardFooter>
            <Link href="/tasks" className="w-full">
              <Button variant="outline" className="mt-4 w-full rounded-md">Ver Tareas <FontAwesomeIcon icon={faArrowRight} className="ml-2" /></Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Tarjeta de Oportunidades Abiertas */}
        <Card className="text-center rounded-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center justify-center gap-2"><FontAwesomeIcon icon={faHandshake} className="w-5 h-5 text-green-500" /> Oportunidades abiertas</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold text-green-500">
            {loading ? 'Cargando...' : opportunityStatusCounts.open}
            </span>
          </CardContent>
          <CardFooter>
            <Link href="/opportunities?status=Open" className="w-full">
              <Button variant="outline" className="mt-4 w-full rounded-md">Ver Abiertas <FontAwesomeIcon icon={faArrowRight} className="ml-2" /></Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Gráfico de Ventas Mensuales - Ocupa más espacio */}
        <Card className="col-span-1 md:col-span-2 rounded-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold mb-4 flex items-center gap-2"><FontAwesomeIcon icon={faChartBar} className="w-5 h-5 text-gray-700" /> Ventas Mensuales</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="95%" height={300}>
              <BarChart data={sales_chart}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="ventas" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      <div className="md:col-span-1 gap-4 flex flex-col">
          {/* Info crm */}
          <div className="bg-white shadow-md rounded-md p-4 flex justify-center items-center flex-1">
        <div className="grid grid-cols-2 gap-4">
          <div className="w-28 h-28 bg-blue-500 rounded-md flex flex-col justify-center items-center text-white font-bold">
        <FontAwesomeIcon icon={faHandshake} className="w-12 h-12 mb-2" />
        <span className="text-lg">{opportunityStatusCounts.inProgress}</span>
        <span className="text-md">En Progreso</span>
          </div>
          <div className="w-28 h-28 bg-green-500 rounded-md flex flex-col justify-center items-center text-white font-bold">
        <FontAwesomeIcon icon={faCoins} className="w-12 h-12 mb-2" />
        <span className="text-lg">{opportunityStatusCounts.won}</span>
        <span className="text-md">Ganadas</span>
          </div>
          <div className="w-28 h-28 bg-red-500 rounded-md flex flex-col justify-center items-center text-white font-bold">
        <FontAwesomeIcon icon={faTimesCircle} className="w-12 h-12 mb-2" />
        <span className="text-lg">{opportunityStatusCounts.lost}</span>
        <span className="text-md">Perdidas</span>
          </div>
          <div className="w-28 h-28 bg-yellow-500 rounded-md flex flex-col justify-center items-center text-white font-bold">
        <FontAwesomeIcon icon={faHandshake} className="w-12 h-12 mb-2" />
        <span className="text-lg">{opportunities.length}</span>
        <span className="text-md">Total</span>
          </div>
        </div>
          </div>
        </div>

      </div>
    </div>
  </>
  );
}