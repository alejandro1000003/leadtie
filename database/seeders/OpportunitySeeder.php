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
        $faker = Faker::create();

        foreach (range(1, 10) as $index) {
            $opportunity = Opportunity::create([
                'title' => $faker->sentence,
                'client_id' => rand(1, 50),
                'value' => $faker->randomFloat(2, 1000, 10000),  // Valor aleatorio entre 1000 y 10000
                'status' => $faker->randomElement(['Open', 'In Progress', 'Won', 'Lost']),  // Estado aleatorio
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
