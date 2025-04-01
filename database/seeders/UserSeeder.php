<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Crear un usuario admin con la contraseña cifrada
        User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('1234'),  // Contraseña cifrada
            'role' => 'admin',
        ]);

        // Crear 10 usuarios con datos aleatorios usando Faker
        foreach (range(1, 10) as $index) {
            User::create([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'password' => Hash::make('password'),  // Contraseña cifrada
                'role' => 'user',
            ]);
        }
    }
}
