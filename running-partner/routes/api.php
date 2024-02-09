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


// Rute koje ne zahtevaju autentifikaciju
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


// Rute koje zahtevaju autentifikaciju

Route::middleware(['auth:sanctum'])->group(function () {

    // Rute koje su dostupne samo ulozi 'trkac'
    Route::middleware(['App\Http\Middleware\CheckUserRole:trkac'])->group(function () {

        Route::prefix('trkaci')->group(function () {
            Route::post('/', [TrkacController::class, 'store']);
            Route::put('/{id}', [TrkacController::class, 'update']);
            Route::delete('/{id}', [TrkacController::class, 'destroy']);
            Route::post('/{id}/add-friend', [TrkacController::class, 'addFriend']);
        });
        Route::prefix('planovi-trka')->group(function () {
            Route::post('/', [PlanTrkeController::class, 'store']);
        });

        Route::prefix('statistike-trke')->group(function () {
            Route::post('/', [StatistikaTrkeController::class, 'store']);
            Route::get('/export/{trkac_id}', [StatistikaTrkeController::class, 'exportToCSV']);
            Route::get('/{trkac_id}', [StatistikaTrkeController::class, 'getStatistikeByTrkacId']);
        });

        Route::prefix('komentari')->group(function () {
            Route::post('/', [KomentarController::class, 'store']);

        });
        Route::get('/statistika-trke/{statistikaId}', [StatistikaTrkeController::class, 'prosecnaBrzina']);

    });

    Route::prefix('planovi-trka')->group(function () {
        Route::get('/', [PlanTrkeController::class, 'index']);

    });
    Route::get('/trkaci/{id}', [TrkacController::class, 'show']);
    Route::get('/trkaci/{id}/mesto', [TrkacController::class, 'getMestoInfo']);
    Route::get('/komentari/{planTrkeId}', [KomentarController::class, 'getKomentariOnPlanTrke']);


    // Rute koje su dostupne samo ulozi 'user'
    Route::middleware(['App\Http\Middleware\CheckUserRole:user'])->group(function () {
        Route::get('/statistike-trke', [StatistikaTrkeController::class, 'index']);

        Route::prefix('komentari')->group(function () {
            Route::delete('/{id}', [KomentarController::class, 'destroy']);
            Route::get('/', [KomentarController::class, 'index']);

        });
    });

    Route::post('/logout', [AuthController::class, 'logout']);
});




Route::post('/trkaci/{id}/upload-slike', [SlikaController::class, 'uploadSlike']);
Route::get('/trkaci', [TrkacController::class, 'index']);
Route::get('/trkaci/{id}/slika', [TrkacController::class, 'prikaziSliku']);





