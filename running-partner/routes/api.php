<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\TrkacController;
use App\Http\Controllers\PlanTrkeController;
use App\Http\Controllers\KomentarController;
use App\Http\Controllers\StatistikaTrkeController;
use App\Http\Controllers\SlikaController;


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
// routes/web.php ili routes/api.php





Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rute koje ne zahtevaju autentifikaciju
Route::prefix('planovi-trka')->group(function () {
    Route::get('/', [PlanTrkeController::class, 'index']);
    Route::get('/{id}', [PlanTrkeController::class, 'show']);
});



Route::prefix('komentari')->group(function () {
    Route::get('/', [KomentarController::class, 'index']);
    Route::get('/{id}', [KomentarController::class, 'show']);
});
Route::prefix('statistike-trke')->group(function () {
    Route::get('/', [StatistikaTrkeController::class, 'index']);
});
/*
Route::middleware(['auth:sanctum', 'App\Http\Middleware\CheckUserRole:trkac'])->group(function () {
    // Rute koje su dostupne samo ulozi 'trkac'
    Route::prefix('trkaci')->group(function () {
        Route::post('/', [TrkacController::class, 'store']);
        Route::put('/{id}', [TrkacController::class, 'update']);
        Route::delete('/{id}', [TrkacController::class, 'destroy']);
        
    });
   
});*/

// Rute koje zahtevaju autentifikaciju
Route::middleware(['auth:sanctum'])->group(function () {
    // Rute koje su dostupne samo ulozi 'trkac'
    Route::middleware(['App\Http\Middleware\CheckUserRole:trkac'])->group(function () {

        Route::prefix('trkaci')->group(function () {
            Route::post('/', [TrkacController::class, 'store']);
            Route::put('/{id}', [TrkacController::class, 'update']);
            Route::delete('/{id}', [TrkacController::class, 'destroy']);
            Route::post('/{id}/upload-slike', [SlikaController::class, 'uploadSlike']);


            Route::get('/', [TrkacController::class, 'index']);
            Route::get('/{id}', [TrkacController::class, 'show']);
        });
        Route::prefix('planovi-trka')->group(function () {
            Route::post('/', [PlanTrkeController::class, 'store']);
            Route::put('/{id}', [PlanTrkeController::class, 'update']);
            Route::delete('/{id}', [PlanTrkeController::class, 'destroy']);
        });

        Route::prefix('statistike-trke')->group(function () {
            Route::post('/', [StatistikaTrkeController::class, 'store']);
            Route::get('/export/{trkac_id}', [StatistikaTrkeController::class, 'exportToCSV']);
        });
    });

    // Rute koje su dostupne samo ulozi 'user'
    Route::middleware(['App\Http\Middleware\CheckUserRole:user'])->group(function () {


        Route::prefix('komentari')->group(function () {
            Route::post('/', [KomentarController::class, 'store']);
            Route::delete('/{id}', [KomentarController::class, 'destroy']);
        });
    });

    Route::post('/logout', [AuthController::class, 'logout']);
});
