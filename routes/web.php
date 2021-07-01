<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LoginControler;
use App\Http\Controllers\EmployeeController;


Route::get('/task',[HomeController::class,'index']);
Route::post('/task/store',[HomeController::class,'store']);
Route::delete('/task/delete/{id}',[HomeController::class,'destroy']);
Route::get('/get/task/{id}',[HomeController::class,'edit']);
Route::post('/task/update',[HomeController::class,'update']);

Route::get('/employes',[EmployeeController::class,'index']);
Route::post('/employee/store',[EmployeeController::class,'store']);
Route::delete('/employee/delete/{id}',[EmployeeController::class,'destroy']);
Route::get('/get/employee/{id}',[EmployeeController::class,'edit']);
Route::post('/employee/update',[EmployeeController::class,'update']);

Route::post('/login',[LoginControler::class,'login']);
Route::get('/logout', [LoginControler::class,'logout']);

Route::get('/{path}', function () {
    return view('index');
})->where('path','.*');
