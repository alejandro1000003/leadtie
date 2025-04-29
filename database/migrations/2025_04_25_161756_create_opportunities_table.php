<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Purga la tabla antes de crearla
        if (Schema::hasTable('opportunities')) {
            DB::table('opportunities')->truncate();
        }        

        Schema::create('opportunities', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('client_id'); // Relación con Client
            $table->string('title');
            $table->decimal('value', 10, 2); // Valor numérico con 2 decimales
            $table->enum('status', ['Open', 'In Progress', 'Won', 'Lost']);
            $table->timestamps();

            // Clave foránea
            $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('opportunities');
    }
};
