<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TrkacController;
use App\Http\Controllers\PlanTrkeController;

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
Route::prefix('planovi-trka')->group(function () {
    // Prikaz svih planova trka
    Route::get('/', [PlanTrkeController::class, 'index']);

    // Prikaz plana trke na osnovu identifikatora
    Route::get('/{id}', [PlanTrkeController::class, 'show']);

    // Kreiranje novog plana trke
    Route::post('/', [PlanTrkeController::class, 'store']);

    // Ažuriranje plana trke
    Route::put('/{id}', [PlanTrkeController::class, 'update']);

});

/*
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/
