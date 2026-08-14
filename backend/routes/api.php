<?php

use App\Http\Controllers\Api\AdminOrderController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CatalogController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\SupremeController;
use App\Http\Controllers\Api\TrackingController;
use App\Http\Controllers\Api\DashboardApiController;
use App\Http\Middleware\EnsureRole;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| REST API Routes with Rate Limiting
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {

    // 1. Auth Public Routes with Strict Rate Limiting (10 req/min)
    Route::middleware('throttle:auth')->group(function () {
        Route::post('/auth/register', [AuthController::class, 'register']);
        Route::post('/auth/login', [AuthController::class, 'login']);
    });

    // 2. Public Catalog & Freight Tracking Routes
    Route::middleware('throttle:api')->get('/catalog', [CatalogController::class, 'index']);
    Route::middleware('throttle:api')->get('/catalog/{slug}', [CatalogController::class, 'show']);
    Route::middleware('throttle:tracking')->get('/track/{id}', [TrackingController::class, 'track']);

    // 3. Authenticated Routes (Requires Sanctum Bearer Token & Rate Limiting)
    Route::middleware(['auth:sanctum', 'throttle:api'])->group(function () {
        
        // Auth session endpoints
        Route::get('/auth/me', [AuthController::class, 'me']);
        Route::put('/auth/me', [AuthController::class, 'updateProfile']);
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        // Notifications
        Route::get('/notifications', [NotificationController::class, 'index']);
        Route::patch('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);

        // Customer Routes
        Route::get('/orders', [OrderController::class, 'index']);
        Route::post('/orders', [OrderController::class, 'store']);
        Route::get('/orders/{id}', [OrderController::class, 'show']);
        
        // Customer Extended Dashboard Routes
        Route::get('/customer/billing', [DashboardApiController::class, 'getCustomerBilling']);
        Route::get('/customer/shipments', [DashboardApiController::class, 'getCustomerShipments']);
        Route::get('/customer/team', [DashboardApiController::class, 'getCustomerTeam']);
        Route::get('/customer/integrations', [DashboardApiController::class, 'getCustomerIntegrations']);

        // Admin Routes (Admin & Supreme Admin)
        Route::middleware([EnsureRole::class . ':admin,supreme_admin'])->prefix('admin')->group(function () {
            Route::get('/orders', [AdminOrderController::class, 'index']);
            Route::post('/orders/{id}/approve', [AdminOrderController::class, 'approve']);
            Route::post('/orders/{id}/request-decline', [AdminOrderController::class, 'requestDecline']);
            
            // Admin Extended Operations Routes
            Route::get('/inventory', [DashboardApiController::class, 'getAdminInventory']);
            Route::get('/shipments', [DashboardApiController::class, 'getAdminShipments']);
            Route::get('/support', [DashboardApiController::class, 'getAdminSupport']);
            Route::get('/analytics', [DashboardApiController::class, 'getAdminAnalytics']);
        });

        // Supreme Admin Exclusive Routes
        Route::middleware([EnsureRole::class . ':supreme_admin'])->prefix('supreme')->group(function () {
            Route::get('/stats', [SupremeController::class, 'dashboardStats']);
            Route::get('/escalations', [SupremeController::class, 'escalations']);
            Route::post('/escalations/{id}/resolve', [SupremeController::class, 'resolveEscalation']);
            Route::get('/staff', [SupremeController::class, 'staffList']);
            Route::patch('/staff/{userId}/role', [SupremeController::class, 'updateRole']);

            // Supreme Extended Platform Endpoints
            Route::get('/finance', [DashboardApiController::class, 'getSupremeFinance']);
            Route::get('/tenants', [DashboardApiController::class, 'getSupremeTenants']);
            Route::get('/audit-logs', [DashboardApiController::class, 'getSupremeAuditLogs']);
            Route::get('/system-health', [DashboardApiController::class, 'getSupremeSystemHealth']);

            // Catalog CRUD for supreme admin
            Route::post('/modules', [CatalogController::class, 'store']);
            Route::put('/modules/{id}', [CatalogController::class, 'update']);
            Route::delete('/modules/{id}', [CatalogController::class, 'destroy']);
        });
    });
});
