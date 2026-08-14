<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Only seed Supreme Admin
        User::updateOrCreate(
            ['email' => 'supreme@scm.com'],
            [
                'name' => 'Supreme Admin',
                'password' => Hash::make('password123'),
                'role' => 'supreme_admin',
            ]
        );
    }
}
