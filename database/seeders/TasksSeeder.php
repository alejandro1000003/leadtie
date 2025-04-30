<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;
use Faker\Factory as Faker;

class TasksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Inserta datos de ejemplo
        $tasks = [
            [
                'title' => 'Follow up with client',
                'description' => 'Call the client to discuss project updates and next steps.',
                'completed' => false,
                'opportunity_id' => 1, // Asegúrate de que esta clave exista en la tabla 'opportunities'
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Prepare presentation',
                'description' => 'Create a presentation for the upcoming sales meeting.',
                'completed' => false,
                'opportunity_id' => 2, // Asegúrate de que esta clave exista en la tabla 'opportunities'
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Review contract',
                'description' => 'Review the contract terms and conditions before signing.',
                'completed' => true,
                'opportunity_id' => 3, // Asegúrate de que esta clave exista en la tabla 'opportunities'
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($tasks as $task) {
            Task::create($task);
        }

        // Genera datos adicionales con Faker
        for ($i = 0; $i < 10; $i++) {
            Task::create([
                'title' => $faker->sentence(3),
                'description' => $faker->paragraph,
                'completed' => $faker->boolean,
                'opportunity_id' => $faker->numberBetween(1, 10), // Ajusta el rango según tus datos
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}