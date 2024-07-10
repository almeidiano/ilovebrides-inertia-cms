<?php

use App\Http\Controllers\ComponentsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// components
Route::prefix('components')->group(function () {
    Route::get('/navigation', [ComponentsController::class, 'showNavigationJson'])->name('showNavigationJson');
    Route::get('/footer', [ComponentsController::class, 'showFooterJson'])->name('showFooterJson');
});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
