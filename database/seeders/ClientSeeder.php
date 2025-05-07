<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Client;
use Faker\Factory as Faker;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run() : void
    {
        Client::truncate();
        $faker = Faker::create();

        $numberOfClients = $faker->numberBetween(50, 150); // Generate a random number of clients between 50 and 150

        foreach (range(1, $numberOfClients) as $index) {
            Client::create([
            'id' => $index,
            'first_name' => $faker->firstName,
            'last_name' => $faker->lastName,
            'email' => $faker->unique()->safeEmail,
            'phone' => $faker->phoneNumber,
            'address' => $faker->streetAddress,
            'company_name' => $faker->company,
            'created_at' => now(),
            'updated_at' => now(),
            ]);
        }
    }
}
