<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Opportunity;
use Faker\Factory as Faker;

class OpportunitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    
    public function run(): void
    {
        $titles = [
            'Propuesta de servicio de mantenimiento informático - Girona',
            'Oferta para desarrollo web con React - Barcelona',
            'Reforma integral de oficinas - Sabadell',
            'Suministro de material de oficina - Lleida',
            'Implementación de ERP para tienda de ropa - Tarragona',
            'Proyecto de ciberseguridad para pyme - Manresa',
            'Renovación de maquinaria industrial - Terrassa',
            'Contrato de soporte técnico anual - Badalona',
            'Consultoría en transformación digital - Reus',
            'Instalación de sistema de videovigilancia - Mataró',
        ];

        foreach ($titles as $title) {
            Opportunity::create([
                'title' => $title,
                'client_id' => rand(1, 50),
                'value' => Faker::create()->randomFloat(2, 1000, 10000),  // Valor aleatorio entre 1000 y 10000
                'status' => Faker::create()->randomElement(['Open', 'In Progress', 'Won', 'Lost']),  // Estado aleatorio
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
