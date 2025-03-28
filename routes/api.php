<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ClientController;

// Rutas de la aplicación con middleware

Route::middleware('throttle:100,1')->get('/clients', [ClientController::class, 'index'])->name('clients.index');
Route::middleware('throttle:60,1')->get('/clients/{id}', [ClientController::class, 'show'])->name('clients.show');
Route::middleware('throttle:10,1')->post('/clients', [ClientController::class, 'store'])->name('clients.store');
Route::middleware('throttle:10,1')->put('/clients/{id}', [ClientController::class, 'update'])->name('clients.update');
Route::middleware('throttle:10,1')->patch('/clients/{id}', [ClientController::class, 'updatePartial'])->name('clients.updatePartial');
Route::middleware('throttle:10,1')->delete('/clients/{id}', [ClientController::class, 'destroy'])->name('clients.destroy');

