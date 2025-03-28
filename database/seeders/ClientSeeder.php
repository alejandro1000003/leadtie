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
        $faker = Faker::create(); // Instancia de Faker

        foreach (range(1, 10) as $index) {
            Client::create([
                'first_name' => $faker->name,
                'last_name' => $faker->lastName,
                'email' => $faker->unique()->safeEmail,
                'phone' => $faker->phoneNumber,
            ]);
        }
    }
}
