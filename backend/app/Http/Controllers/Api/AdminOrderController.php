<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CustomerModule;
use App\Models\Notification;
use App\Models\Order;
use Illuminate\Http\Request;

class AdminOrderController extends Controller
{
    public function index(Request $request)
    {
        $status = $request->query('status');

        $query = Order::with(['customer', 'module'])->orderBy('created_at', 'desc');

        if ($status) {
            $query->where('status', $status);
        }

        $orders = $query->get();

        return response()->json([
            'status' => 'success',
            'data' => $orders,
        ]);
    }

    public function approve(Request $request, $id)
    {
        $order = Order::with('module')->findOrFail($id);

        if ($order->status === 'approved') {
            return response()->json(['message' => 'Order is already approved.'], 400);
        }

        // Update order status
        $order->update(['status' => 'approved']);

        // Provision module in customer_modules
        CustomerModule::updateOrCreate(
            [
                'cust_id' => $order->cust_id,
                'module_id' => $order->module_id,
            ],
            [
                'is_active' => true,
                'granted_by' => $request->user()->id,
            ]
        );

        // Notify customer
        Notification::create([
            'cust_id' => $order->cust_id,
            'message' => "Your order for {$order->module->name} has been APPROVED and provisioned.",
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $order,
            'message' => 'Order approved and module access granted.',
        ]);
    }

    public function requestDecline(Request $request, $id)
    {
        $request->validate([
            'decline_reason' => 'required|string|min:5',
        ]);

        $order = Order::with('module')->findOrFail($id);

        $order->update([
            'status' => 'pending_decline',
            'decline_reason' => $request->decline_reason,
        ]);

        // Notify customer
        Notification::create([
            'cust_id' => $order->cust_id,
            'message' => "Order #{$order->id} decline requested by Admin. Pending Supreme Admin review.",
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $order,
            'message' => 'Decline request submitted for Supreme Admin escalation.',
        ]);
    }
}
