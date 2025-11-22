<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserRole;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = UserRole::where('name', 'admin')->first();

        if ($adminRole) {
            User::updateOrCreate(
                ['email' => 'admin@gmail.com'],
                [
                    'name' => 'admin',
                    'password' => Hash::make('Admin123'),
                    'role_id' => $adminRole->id,
                ]
            );
        }
    }
}
