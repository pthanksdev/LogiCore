<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'service' => 'SCM Enterprise API Portal',
        'status' => 'operational',
        'version' => 'v1',
    ]);
});
