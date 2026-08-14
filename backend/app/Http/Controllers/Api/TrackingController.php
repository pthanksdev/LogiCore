<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class TrackingController extends Controller
{
    public function track(Request $request, $id)
    {
        $order = Order::with(['module', 'customer'])->find($id);

        if (!$order) {
            // Try finding by cust_id
            $orders = Order::with(['module', 'customer'])
                ->where('cust_id', $id)
                ->orderBy('created_at', 'desc')
                ->get();

            if ($orders->isEmpty()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'No active shipments or orders found for given reference ID.',
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'type' => 'customer_orders',
                'data' => $orders,
            ]);
        }

        return response()->json([
            'status' => 'success',
            'type' => 'single_order',
            'data' => $order,
        ]);
    }
}
