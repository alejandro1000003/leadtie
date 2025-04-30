<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Purga la tabla antes de crearla
        if (Schema::hasTable('tasks')) {
            DB::table('tasks')->truncate();
        }     

        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->boolean('completed')->default(false);
            $table->unsignedBigInteger('opportunity_id'); // Clave foránea
            $table->timestamps(); // Includes 'created_at' and 'updated_at'

            $table->foreign('opportunity_id')->references('id')->on('opportunities')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};