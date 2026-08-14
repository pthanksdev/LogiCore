<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CustomerModule;
use App\Models\Module;
use App\Models\Notification;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if (!$user->cust_id) {
            return response()->json(['data' => []]);
        }

        $orders = Order::with('module')
            ->where('cust_id', $user->cust_id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $orders,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'module_id' => 'required|exists:modules,id',
        ]);

        $user = $request->user();

        if (!$user->cust_id) {
            return response()->json(['message' => 'Customer profile not found.'], 400);
        }

        // 1. Check if customer already has active module access
        $activeAccess = CustomerModule::where('cust_id', $user->cust_id)
            ->where('module_id', $request->module_id)
            ->where('is_active', true)
            ->exists();

        if ($activeAccess) {
            return response()->json([
                'message' => 'You already have active access to this module.'
            ], 422);
        }

        // 2. Check if pending order already exists
        $existingOrder = Order::where('cust_id', $user->cust_id)
            ->where('module_id', $request->module_id)
            ->whereIn('status', ['pending', 'pending_decline'])
            ->first();

        if ($existingOrder) {
            return response()->json([
                'message' => 'An active order for this module is already being processed.'
            ], 422);
        }

        // 3. Create Order
        $order = Order::create([
            'cust_id' => $user->cust_id,
            'module_id' => $request->module_id,
            'status' => 'pending',
        ]);

        // Send notification
        $module = Module::find($request->module_id);
        Notification::create([
            'cust_id' => $user->cust_id,
            'message' => "Order #{$order->id} for {$module->name} placed successfully.",
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $order->load('module'),
        ], 201);
    }

    public function show(Request $request, $id)
    {
        $user = $request->user();

        $order = Order::with(['module', 'customer'])->findOrFail($id);

        // Security check
        if ($user->role === 'customer' && $order->cust_id !== $user->cust_id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        return response()->json([
            'status' => 'success',
            'data' => $order,
        ]);
    }
}
