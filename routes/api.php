<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\OpportunityController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\IsUserAuth;
use App\Http\Middleware\IsAdmin;

// Rutas de la aplicación con middleware
Route::patch('/opportunities/{id}', [OpportunityController::class, 'updatePartial'])->name('opportunities.updatePartial');

Route::post('/register', [AuthController::class, 'register']);
Route::middleware('throttle:10,1')->post('/login', [AuthController::class, 'login']);
Route::post('/refresh', [AuthController::class, 'refresh']);
Route::post('/getuser', [AuthController::class, 'getUser']);

Route::middleware([IsUserAuth::class])->group(function () {
    
    Route::controller(AuthController::class)->group(function () {
        Route::get('/user', 'getUser')->name('user');
        Route::post('/logout', 'logout')->name('logout');
    });
    
    Route::get('/clients', [ClientController::class, 'index'])->name('clients.index');
    Route::get('/clients/{id}', [ClientController::class, 'show'])->name('clients.show');
    
    Route::get('/opportunities', [OpportunityController::class, 'index'])->name('opportunities.index');
    Route::get('/opportunities/{id}', [OpportunityController::class, 'index'])->name('opportunities.show');
    
    Route::get('/tasks', [TaskController::class, 'index'])->name('tasks.index');
    Route::get('/tasks/{id}', [TaskController::class, 'index'])->name('tasks.show');
    
    Route::middleware([IsAdmin::class])->group(function () {
        Route::post('/clients', [ClientController::class, 'store'])->name('clients.store');
        Route::put('/clients/{id}', [ClientController::class, 'update'])->name('clients.update');
        Route::patch('/clients/{id}', [ClientController::class, 'updatePartial'])->name('clients.updatePartial');
        Route::middleware('throttle:10,1')->delete('/clients/{id}', [ClientController::class, 'destroy'])->name('clients.destroy');
    });
});


