<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\TrkacController;
use App\Http\Controllers\PlanTrkeController;
use App\Http\Controllers\KomentarController;
use App\Http\Controllers\StatistikaTrkeController;






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

/*
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/



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


