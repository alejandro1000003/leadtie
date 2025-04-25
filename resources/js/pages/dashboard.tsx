import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="flex w-full p-4 flex-col md:flex-row min-h-screen  ">
      <div className="flex-wrap bg-gray-700 p-3 border-gray-200">
        <Navbar/>
      </div>

      <div className="flex-1 bg-gray-100 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        <Card className="col-span-3">
          <CardHeader>
              <CardTitle className="text-2xl mb-2 text-gray-900">Dashboard CRM</CardTitle>
              <CardDescription className="text-muted-foreground">Resumen general de tu actividad</CardDescription>
          </CardHeader>
        </Card>

        <Card className="col-span-3 md:col-span-1">
        <CardHeader>
            <CardTitle className="text-xl font-semibold mb-2 text-gray-800">Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-500">400</p>
          </CardContent>
          <CardFooter>
            <Link href="/clients">
              <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">Ver Clientes</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="col-span-3 md:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl font-semibold mb-2 text-gray-800">Oportunidades</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-teal-500">26 abiertas</p>
          </CardContent>
          <CardFooter>
            <Link href="/opportunities">
              <Button className="w-full bg-teal-500 text-white hover:bg-teal-600">Ver oportunidades</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="col-span-3 md:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl font-semibold mb-2 text-gray-800">Tareas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-500">12 pendientes</p>
          </CardContent>
          <CardFooter>
            <Link href="/tasks">
              <Button className="w-full bg-yellow-500 text-gray-800 hover:bg-yellow-600">Ver tareas</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-xl font-semibold mb-4 text-gray-800">Ventas Mensuales</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={sales_chart}>
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="ventas" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>
    </div>
  </>
  );
}