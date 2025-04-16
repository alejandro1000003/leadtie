<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Client;  // Importa el modelo Client
use Faker\Factory as Faker;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run() : void
    {
        // Eliminar todos los registros y reiniciar el ID autoincremental
        Client::truncate();
        $faker = Faker::create(); // Instancia de Faker

        foreach (range(1, 100) as $index) {
            Client::create([
            'id' => $index,
            'first_name' => $faker->firstName,
            'last_name' => $faker->lastName,
            'email' => $faker->unique()->safeEmail,
            'phone' => $faker->phoneNumber,
            'address' => $faker->streetAddress, // Dirección más corta
            'company_name' => $faker->company,
            'created_at' => now(),
            'updated_at' => now(),
            ]);
        }
    }
}
