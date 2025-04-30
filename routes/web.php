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
    return Inertia::render('dashboard');
});

Route::get('/clients', function () {
    return Inertia::render('clients');
});

Route::get('/opportunities', function () {
    return Inertia::render('opportunities');
});

Route::get('/tasks', function () {
    return Inertia::render('tasks');
});

Route::get('/getTotalnumber', function () {
    return Inertia::render('getTotalnumber');
});