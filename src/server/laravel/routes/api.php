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
    Route::get("/stack/list", 'StackController@list');

    Route::middleware('auth:api')->group(function () {
        Route::post('/logout', 'Auth\ApiAuthController@logout')->name('logout.api');
        Route::get('/auth', 'Auth\ApiAuthController@auth')->name('auth.api');
        Route::apiResource('/project', 'ProjectController')->except(['index', 'show']);
        Route::apiResource('/stack', 'StackController')->except(['index', 'show']);
    });

});

Route::apiResource('/project', 'ProjectController')->only(['index', 'show']);
Route::apiResource('/stack', 'StackController')->only(['index', 'show']);

Route::get('/about', 'AboutController@index')->name('about.api');
Route::post('/about', 'AboutController@store')->name('about.api');
Route::post('/career', 'CareerController@store')->name('about.api');
Route::delete('/about', 'AboutController@destroy')->name('about.api');
