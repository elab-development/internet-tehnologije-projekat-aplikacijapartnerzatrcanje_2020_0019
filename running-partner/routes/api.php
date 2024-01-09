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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
*/


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


/*

Route::prefix('planovi-trka')->group(function () {
    // Prikazuje sve planove trka
    Route::get('/', [PlanTrkeController::class, 'index']);
    // Prikazuje planove trka na osnovu id
    Route::get('/{id}', [PlanTrkeController::class, 'show']);
    // Dodaje novi plan trke
    Route::post('/', [PlanTrkeController::class, 'store']);
    // Ažurira plan trke
    Route::put('/{id}', [PlanTrkeController::class, 'update']);
});
Route::prefix('trkaci')->group(function () {
    //Prikazuje listu svih trkaca
    Route::get('/', [TrkacController::class, 'index']);
    //Prikazuje profil odredjenog trkača na osnovu id
    Route::get('/{id}', [TrkacController::class, 'show']);
    //Dodaje novog trkaca
    Route::post('/', [TrkacController::class, 'store']);
    //Azurira informacije na profilu trkaca
    Route::put('/{id}', [TrkacController::class, 'update']);
    //Brise odredjenog trkaca iz baze
    Route::delete('/{id}', [TrkacController::class, 'destroy']);
});

Route::prefix('komentari')->group(function () {
    // Prikazuje sve komentare
    Route::get('/', [KomentarController::class, 'index']);
    // Dodaje novi komentar
    Route::post('/', [KomentarController::class, 'store']);
    // Brise odredjeni komentar
    Route::delete('/{id}', [KomentarController::class, 'destroy']);
});

Route::post('/statistika-trke', [StatistikaTrkeController::class, 'store']);
Route::get('/statistika-trke', [StatistikaTrkeController::class, 'index']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});




Route::group(['middleware' => ['auth:sanctum']], function() {

    Route::resource('/komentar', KomentarController::class)->only(['store','destroy']);
    Route::resource('/statistika_trke', StatistikaTrkeController::class)->only(['update', 'destroy']);
    Route::resource('/trkac', TrkacController::class)->only(['store','update','destroy']);
    Route::resource('/plan_trke', PlanTrkeController::class)->only(['store','update','destroy']);
    Route::post('/logout', [AuthController::class, 'logout']);
});


// ...

Route::prefix('planovi-trka')->group(function () {
    // Dodajte middleware za autorizaciju na sve rute unutar ovog prefixa
    Route::middleware(['auth:sanctum'])->group(function () {
        // Prikazuje sve planove trka
       Route::get('/', [PlanTrkeController::class, 'index']);
        // Prikazuje planove trka na osnovu id
        Route::get('/{id}', [PlanTrkeController::class, 'show']);
        // Dodaje novi plan trke
        Route::post('/', [PlanTrkeController::class, 'store']);
        // Ažurira plan trke
        Route::put('/{id}', [PlanTrkeController::class, 'update']);
    });
});

Route::prefix('trkaci')->group(function () {
    // Dodajte middleware za autorizaciju na sve rute unutar ovog prefixa
    Route::middleware(['auth:sanctum'])->group(function () {
        //Prikazuje listu svih trkaca
        Route::get('/', [TrkacController::class, 'index']);
        //Prikazuje profil odredjenog trkača na osnovu id
        Route::get('/{id}', [TrkacController::class, 'show']);
        //Dodaje novog trkaca
        Route::post('/', [TrkacController::class, 'store']);
        //Azurira informacije na profilu trkaca
        Route::put('/{id}', [TrkacController::class, 'update']);
        //Brise odredjenog trkaca iz baze
        Route::delete('/{id}', [TrkacController::class, 'destroy']);
    });
});

Route::prefix('komentari')->group(function () {
    // Dodajte middleware za autorizaciju na sve rute unutar ovog prefixa
    Route::middleware(['auth:sanctum'])->group(function () {
        // Prikazuje sve komentare
        Route::get('/', [KomentarController::class, 'index']);
        // Dodaje novi komentar
        Route::post('/', [KomentarController::class, 'store']);
        // Brise odredjeni komentar
        Route::delete('/{id}', [KomentarController::class, 'destroy']);
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/statistika-trke', [StatistikaTrkeController::class, 'store']);
    Route::get('/statistika-trke', [StatistikaTrkeController::class, 'index']);
    Route::resource('/komentar', KomentarController::class)->only(['store','destroy']);
    Route::get('komentari/{id}', [KomentarController::class, 'show']);
    Route::resource('/statistika_trke', StatistikaTrkeController::class)->only(['update', 'destroy']);
    Route::resource('/trkac', TrkacController::class)->only(['store','update','destroy']);
    Route::resource('/plan_trke', PlanTrkeController::class)->only(['store','update','destroy']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
*/

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



