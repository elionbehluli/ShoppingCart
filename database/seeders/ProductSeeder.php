<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::create([
            'name' => 'Laptop',
            'price' => 999.99,
            'stock' => 10
        ]);

        Product::create([
            'name' => 'Smartphone',
            'price' => 699.99,
            'stock' => 20
        ]);

        Product::create([
            'name' => 'Headphones',
            'price' => 199.99,
            'stock' => 50
        ]);
        
        Product::create([
            'name' => 'Smart Watch',
            'price' => 299.99,
            'stock' => 15
        ]);
    }
}
