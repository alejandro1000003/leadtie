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
    <div className="flex w-full p-4 flex-col md:flex-row min-h-screen">
      <div className="flex-wrap bg-gray-800 p-5">
        <Navbar/>
      </div>
      
      <div className="flex-1 bg-gray-100 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        <Card className="col-span-3">
          <CardHeader>
              <CardTitle className="text-2xl mb-2">Dashboard CRM</CardTitle>
              <CardDescription className="text-muted-foreground">Resumen general de tu actividad</CardDescription>
          </CardHeader>
        </Card>

        <Card className="col-span-3 md:col-span-1">
        <CardHeader>
            <CardTitle className="text-xl font-semibold mb-2">Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl text-[#8884d8]">400</p>
          </CardContent>
          <CardFooter>
            <Link href="/clientes">
              <Button variant="outline" className="mt-4 w-full">Ver Clientes</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="col-span-3 md:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl font-semibold mb-2">Oportunidades</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl text-[#8884d8]">26 abiertas</p>
          </CardContent>
          <CardFooter>
            <Link href="/oportunidades">
              <Button variant="outline" className="mt-4 w-full">Ver oportunidades</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="col-span-3 md:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl font-semibold mb-2">Tareas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl text-[#8884d8]">12 pendientes</p>
          </CardContent>
          <CardFooter>
            <Link href="/tareas">
              <Button variant="outline" className="mt-4 w-full">Ver tareas</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-xl font-semibold mb-4">Ventas Mensuales</CardTitle>
          </CardHeader>
          <CardContent>
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