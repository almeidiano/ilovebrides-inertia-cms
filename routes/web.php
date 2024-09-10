<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ComponentsController;
use App\Http\Controllers\SEOController;
use App\Http\Controllers\users\AdminController;
use App\Http\Controllers\users\UserController;
use App\Http\Middleware\Authentication;
use Illuminate\Support\Facades\Route;

Route::get('/login', function () {
    return inertia('Login');
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

//Route::middleware([Authentication::class])->prefix('iframes')->controller(ComponentsController::class)->group(function () {
//    Route::get('/footer', 'showFooterIframe')->name('FooterIframe');
//    Route::get('/navigation', 'showNavigationIframe')->name('NavigationIframe');
//});

Route::middleware([Authentication::class])->group(function () {
    Route::inertia('/', 'Home')->name('home');

    //iframes
    Route::prefix('iframes')->group(function () {
        Route::get('/footer', [ComponentsController::class, 'showFooterIframe'])->name('FooterIframe');
        Route::get('/navigation', [ComponentsController::class, 'showNavigationIframe'])->name('NavigationIframe');
    });

    // seo
    Route::prefix('seo')->group(function () {
        Route::get('/metadata', [SEOController::class, 'index'])->name('Metadata');
        Route::post('/metadata', [SEOController::class, 'update'])->name('MetadataUpdate');
        Route::inertia('/integrations', 'seo/Integration')->name('Integration');
        Route::inertia('/sitemap', 'seo/Sitemap')->name('Sitemap');
    });

    // components
    Route::prefix('components')->group(function () {
        Route::get('/navigation', [ComponentsController::class, 'showNavigation'])->name('Navigation');
        Route::get('/footer', [ComponentsController::class, 'showFooter'])->name('Footer');

        Route::put('/navigation', [ComponentsController::class, 'updateNavigation'])->name('updateNavigation');
        Route::post('/navigation', [ComponentsController::class, 'updateNavigationLogo'])->name('updateNavigationLogo');

        Route::put('/footer', [ComponentsController::class, 'updateFooter'])->name('updateFooter');
        Route::post('/footer', [ComponentsController::class, 'updateFooterLogo'])->name('updateFooterLogo');
    });

        // users
        Route::prefix('users')->group(function () {
            // public users
            Route::get('/public/{id}', [UserController::class, 'showPublicUser'])->name('showPublicUser');
            Route::get('/public', [UserController::class, 'showPublicUsers'])->name('showPublicUsers');
            Route::post('/public/delete', [UserController::class, 'deletePublicUsers'])->name('deletePublicUsers');
            Route::post('/public', [UserController::class, 'createUser'])->name('createUser');
            Route::put('/public/{id}/user/{user_id}', [UserController::class, 'updateUser'])->name('updateUser');

            // admin users
            Route::get('/admin', [AdminController::class, '__construct'])->name('showAdminUsers');
            Route::post('/admin', [AdminController::class, 'createAdmin'])->name('createAdmin');
            Route::post('/admin/delete', [AdminController::class, 'deleteAdminUsers'])->name('deleteAdminUsers');
            Route::put('/admin/{id}', [AdminController::class, 'updateAdmin'])->name('updateAdmin');
        });
});

// Route::middleware('authenticated')->group(function () {
//     Route::get('/', function () {
//         return inertia('Home');
//     });
// });
