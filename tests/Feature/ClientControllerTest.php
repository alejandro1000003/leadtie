<?php

namespace Tests\Feature;

use App\Models\Client;  
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ClientControllerTest extends TestCase
{
    use RefreshDatabase; // Resetea la base de datos después de cada test
    use WithFaker; // Para generar datos aleatorios

    /**
     * Test para crear un nuevo cliente.
     *
     * @return void
     */
    public function test_can_create_a_client()
    {
        // 1. Preparación (Arrange)
        $data = [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
        ];

        // 2. Acción (Act)
        $response = $this->post('/clients', $data); // Asume que tienes una ruta POST '/clients'

        // 3. Afirmaciones (Assert)
        $response->assertStatus(302); // Verifica que la respuesta sea una redirección (302) después de la creación
        $this->assertDatabaseHas('clients', $data); // Verifica que los datos se hayan guardado en la base de datos
    }

}
