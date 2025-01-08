<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\EnchereController;
use App\Http\Controllers\ObjetController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
})->name("home");
Route::resource('/objets', ObjetController::class);
Route::get('/dashboard', [UserController::class, 'dashboard']);
Route::get('/latest', [ObjetController::class, 'latestObjects']);
Route::get('/objets/{id}', [ObjetController::class, 'show']);
Route::post('/objets/{id}/bid', [EnchereController::class, 'store']); 
