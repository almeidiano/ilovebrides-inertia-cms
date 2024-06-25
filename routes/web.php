<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ComponentsController;
use Illuminate\Support\Facades\Route;

Route::get('/login', function () {
    return inertia('Login');
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::inertia('/', 'Home')->name('home');

// seo
Route::prefix('seo')->group(function () {
    Route::inertia('/metadata', 'seo/Metadata')->name('Metadata');
    Route::inertia('/integrations', 'seo/Integration')->name('Integration');
    Route::inertia('/sitemap', 'seo/Sitemap')->name('Sitemap');
});

// components
Route::prefix('components')->group(function () {
    Route::get('/navigation', [ComponentsController::class, 'showNavigation'])->name('Navigation');
    Route::get('/footer', [ComponentsController::class, 'showFooter'])->name('Footer');


    // Route::inertia('/navigation', 'seo/Navigation')->name('Navigation');
    // Route::inertia('/footer', 'components/Footer')->name('Footer');
});

// users
Route::prefix('users')->group(function () {
    Route::get('/general', function () {
        return inertia('users/General');
    });
});

// Route::middleware('authenticated')->group(function () {
//     Route::get('/', function () {
//         return inertia('Home');
//     });
// });