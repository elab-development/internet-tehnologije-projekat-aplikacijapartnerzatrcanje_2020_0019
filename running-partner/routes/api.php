<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\TrkacController;
use App\Http\Controllers\PlanTrkeController;
use App\Http\Controllers\KomentarController;
use App\Http\Controllers\StatistikaTrkeController;
use App\Http\Controllers\Auth\PasswordResetLinkController; // Dodato
use App\Http\Controllers\Auth\NewPasswordController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


// Rute koje ne zahtevaju autentifikaciju
Route::prefix('planovi-trka')->group(function () {
    Route::get('/', [PlanTrkeController::class, 'index']);
    Route::get('/{id}', [PlanTrkeController::class, 'show']);
});

Route::prefix('trkaci')->group(function () {
    Route::get('/', [TrkacController::class, 'index']);
    Route::get('/{id}', [TrkacController::class, 'show']);
});

Route::prefix('komentari')->group(function () {
    Route::get('/', [KomentarController::class, 'index']);
    Route::get('/{id}', [KomentarController::class, 'show']);
});

// Rute koje zahtevaju autentifikaciju
Route::middleware(['auth:sanctum'])->group(function () {
    Route::prefix('planovi-trka')->group(function () {
        Route::post('/', [PlanTrkeController::class, 'store']);
        Route::put('/{id}', [PlanTrkeController::class, 'update']);
        Route::delete('/{id}', [PlanTrkeController::class, 'destroy']);
    });

    Route::prefix('trkaci')->group(function () {
        Route::post('/', [TrkacController::class, 'store']);
        Route::put('/{id}', [TrkacController::class, 'update']);
        Route::delete('/{id}', [TrkacController::class, 'destroy']);
    });

    Route::prefix('komentari')->group(function () {
        Route::post('/', [KomentarController::class, 'store']);
        Route::delete('/{id}', [KomentarController::class, 'destroy']);
    });


    Route::post('/logout', [AuthController::class, 'logout']);
});



