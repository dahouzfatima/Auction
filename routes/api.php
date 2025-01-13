<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EnchereController;
use App\Http\Controllers\ObjetController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WishlistController;
use App\Models\Objet;
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

Route::middleware('auth:sanctum')->group(
    function(){
        Route::post('/logout',[AuthController::class,'logout']);
        Route::get('/me',[AuthController::class,'me']);
        Route::get('/objets/{id}', [ObjetController::class, 'show']);
        Route::post('/objets/{id}/bid', [EnchereController::class, 'store']); 
        Route::get('/dashboardUser', [UserController::class, 'dashboardUser']); 
        Route::post('/wishlist', [WishlistController::class, 'store']);
        Route::get('/wishlist', [WishlistController::class, 'getWishList']);
        Route::get('/wishlistU', [WishlistController::class, 'getWishListUser']);
        Route::post('/objets/add', [ObjetController::class, 'store']);
    }
);
Route::resource('/objets', ObjetController::class);

Route::post('signup',[AuthController::class,'signup']);
Route::post('login',[AuthController::class,'login'])->name('login');

Route::get('/sales/{userId}', [ObjetController::class, 'getUserSales']);
Route::get('/encheres/{userId}', [ObjetController::class, 'getUserEncheres']);
Route::get('/objets/{id}', [ObjetController::class, 'show']);




