<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Module;
use App\Models\Customer;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed Supreme Admin
        User::updateOrCreate(
            ['email' => 'supreme@scm.com'],
            [
                'name' => 'Supreme Admin',
                'password' => Hash::make('password123'),
                'role' => 'supreme_admin',
            ]
        );

        // 2. Seed Ops Admin
        User::updateOrCreate(
            ['email' => 'admin@scm.com'],
            [
                'name' => 'Ops Platform Admin',
                'password' => Hash::make('password123'),
                'role' => 'admin',
            ]
        );

        // 3. Seed Default Customer Tenant
        $custUser = User::updateOrCreate(
            ['email' => 'customer@scm.com'],
            [
                'name' => 'Demo Enterprise Customer',
                'password' => Hash::make('password123'),
                'role' => 'customer',
                'cust_id' => '1000000001',
                'company' => 'Acme Global Supply Chain',
            ]
        );

        Customer::updateOrCreate(
            ['cust_id' => '1000000001'],
            [
                'user_id' => $custUser->id,
                'name' => 'Demo Enterprise Customer',
                'email' => 'customer@scm.com',
                'company' => 'Acme Global Supply Chain',
            ]
        );

        // 4. Seed Platform Modules Catalog
        $modules = [
            [
                'name' => 'Real-Time Inventory Control',
                'slug' => 'inventory-control',
                'description' => 'Multi-warehouse stock tracking with automated reorder alerts and SKU lifecycle telemetry.',
                'base_price' => 499.00,
            ],
            [
                'name' => 'Multi-Carrier Freight Tracking',
                'slug' => 'freight-tracking',
                'description' => 'Global parcel tracking across FedEx, DHL, and Maersk with live webhook status updates.',
                'base_price' => 799.00,
            ],
            [
                'name' => 'Automated Procurement Engine',
                'slug' => 'procurement-engine',
                'description' => 'Supplier purchase order automation, quote matching, and vendor SLA scorecards.',
                'base_price' => 649.00,
            ],
            [
                'name' => 'Omnichannel Order Fulfillment',
                'slug' => 'order-fulfillment',
                'description' => 'High-velocity order dispatching, packing slip generation, and two-step approval workflows.',
                'base_price' => 999.00,
            ],
        ];

        foreach ($modules as $mod) {
            Module::updateOrCreate(['slug' => $mod['slug']], $mod);
        }
    }
}
