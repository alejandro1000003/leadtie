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

        // Inserta datos de ejemplo en español
        $tasks = [
            [
            'title' => 'Llamar al cliente',
            'description' => 'Llamar al cliente para discutir actualizaciones del proyecto y próximos pasos.',
            'completed' => false,
            'opportunity_id' => 1, // Asegúrate de que esta clave exista en la tabla 'opportunities'
            'created_at' => now(),
            'updated_at' => now(),
            ],
            [
            'title' => 'Preparar presentación',
            'description' => 'Crear una presentación para la próxima reunión de ventas.',
            'completed' => false,
            'opportunity_id' => 2, // Asegúrate de que esta clave exista en la tabla 'opportunities'
            'created_at' => now(),
            'updated_at' => now(),
            ],
            [
            'title' => 'Revisar contrato',
            'description' => 'Revisar los términos y condiciones del contrato antes de firmar.',
            'completed' => true,
            'opportunity_id' => 3, // Asegúrate de que esta clave exista en la tabla 'opportunities'
            'created_at' => now(),
            'updated_at' => now(),
            ],
            [
            'title' => 'Enviar propuesta',
            'description' => 'Enviar la propuesta final al cliente para su revisión.',
            'completed' => false,
            'opportunity_id' => 4,
            'created_at' => now(),
            'updated_at' => now(),
            ],
            [
            'title' => 'Organizar reunión',
            'description' => 'Programar y organizar una reunión con el equipo de desarrollo.',
            'completed' => false,
            'opportunity_id' => 5,
            'created_at' => now(),
            'updated_at' => now(),
            ],
            [
            'title' => 'Actualizar documentación',
            'description' => 'Actualizar la documentación del proyecto con los últimos cambios.',
            'completed' => true,
            'opportunity_id' => 6,
            'created_at' => now(),
            'updated_at' => now(),
            ],
            [
            'title' => 'Realizar análisis',
            'description' => 'Realizar un análisis de los datos recopilados durante la investigación.',
            'completed' => false,
            'opportunity_id' => 7,
            'created_at' => now(),
            'updated_at' => now(),
            ],
            [
            'title' => 'Capacitar al equipo',
            'description' => 'Realizar una sesión de capacitación para el equipo sobre nuevas herramientas.',
            'completed' => false,
            'opportunity_id' => 8,
            'created_at' => now(),
            'updated_at' => now(),
            ],
            [
            'title' => 'Enviar informe',
            'description' => 'Preparar y enviar el informe mensual al gerente.',
            'completed' => true,
            'opportunity_id' => 9,
            'created_at' => now(),
            'updated_at' => now(),
            ],
            [
            'title' => 'Planificar estrategia',
            'description' => 'Desarrollar una estrategia para mejorar las ventas en el próximo trimestre.',
            'completed' => false,
            'opportunity_id' => 10,
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