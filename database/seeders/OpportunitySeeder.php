<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Opportunity;  // Importa el modelo Opportunity
use App\Models\Task;  // Importa el modelo Task
use Faker\Factory as Faker;

class OpportunitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();  // Instancia de Faker

        // Crear 10 oportunidades
        foreach (range(1, 10) as $index) {
            // Crear una oportunidad
            $opportunity = Opportunity::create([
                'title' => $faker->sentence,  // Título aleatorio
                'client_id' => $faker->company,  // Nombre del cliente aleatorio
                'value' => $faker->randomFloat(2, 1000, 10000),  // Valor aleatorio entre 1000 y 10000
                'status' => $faker->randomElement(['Open', 'In Progress', 'Won', 'Lost']),  // Estado aleatorio
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
