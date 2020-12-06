<?php

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(['middleware' => ['cors', 'json.response']], function () {

    Route::post('/register', 'Auth\ApiAuthController@register')->name('register.api');
    Route::post('/login', 'Auth\ApiAuthController@login')->name('login.api');
    Route::middleware('auth:api')->group(function () {
        Route::post('/logout', 'Auth\ApiAuthController@logout')->name('logout.api');
        Route::get('/auth', 'Auth\ApiAuthController@auth')->name('auth.api');
    });

});

Route::apiResource('/project', 'ProjectController');
Route::apiResource('/stack', 'StackController');
