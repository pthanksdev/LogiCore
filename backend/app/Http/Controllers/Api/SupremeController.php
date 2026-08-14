<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Module;
use App\Models\Notification;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;

class SupremeController extends Controller
{
    public function dashboardStats()
    {
        $totalOrders = Order::count();
        $pendingEscalations = Order::where('status', 'pending_decline')->count();
        $activeCustomers = Customer::count();
        $totalModules = Module::count();
        $staffAdmins = User::whereIn('role', ['admin', 'supreme_admin'])->count();

        return response()->json([
            'status' => 'success',
            'data' => [
                'total_orders' => $totalOrders,
                'pending_escalations' => $pendingEscalations,
                'active_customers' => $activeCustomers,
                'total_modules' => $totalModules,
                'staff_admins' => $staffAdmins,
            ],
        ]);
    }

    public function escalations()
    {
        $escalations = Order::with(['customer', 'module'])
            ->where('status', 'pending_decline')
            ->orderBy('updated_at', 'desc')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $escalations,
        ]);
    }

    public function resolveEscalation(Request $request, $id)
    {
        $request->validate([
            'action' => 'required|in:confirm_decline,reject_decline,force_approve',
        ]);

        $order = Order::with('module')->findOrFail($id);

        if ($request->action === 'confirm_decline') {
            $order->update(['status' => 'rejected']);

            Notification::create([
                'cust_id' => $order->cust_id,
                'message' => "Order #{$order->id} for {$order->module->name} has been DECLINED after Supreme Admin escalation review.",
            ]);

            $message = 'Order decline confirmed and finalized.';
        } elseif ($request->action === 'force_approve') {
            $order->update(['status' => 'approved']);

            Notification::create([
                'cust_id' => $order->cust_id,
                'message' => "Order #{$order->id} for {$order->module->name} was OVERRIDDEN and APPROVED by Supreme Admin.",
            ]);

            $message = 'Order decline overridden and approved by Supreme Admin.';
        } else {
            // Restore to pending
            $order->update(['status' => 'pending']);

            Notification::create([
                'cust_id' => $order->cust_id,
                'message' => "Order #{$order->id} decline was rejected by Supreme Admin and returned to processing queue.",
            ]);

            $message = 'Decline request rejected; order returned to pending queue.';
        }

        return response()->json([
            'status' => 'success',
            'data' => $order,
            'message' => $message,
        ]);
    }

    public function staffList()
    {
        $staff = User::whereIn('role', ['admin', 'supreme_admin'])
            ->orderBy('name', 'asc')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $staff,
        ]);
    }

    public function updateRole(Request $request, $userId)
    {
        $request->validate([
            'role' => 'required|in:customer,admin,supreme_admin',
        ]);

        $user = User::findOrFail($userId);
        $user->update(['role' => $request->role]);

        return response()->json([
            'status' => 'success',
            'data' => $user,
            'message' => "User {$user->name} role updated to {$request->role}.",
        ]);
    }
}
