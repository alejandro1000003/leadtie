<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
});

Route::get('/login', function () {
    return Inertia::render('login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/dashboard');
});
