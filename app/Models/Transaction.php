<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Cart;
use App\Models\Product;

class Transaction extends Model
{
    protected $primaryKey = 'tid';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'tid',
        'buyer_id',
        'cart_id',
        'price',
    ];

    protected $appends = ['products_summary'];

    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'cart_products', 'cart_id', 'product_id', 'cart_id')
            ->withPivot('quantity')
            ->withTimestamps();
    }

    public function getProductsSummaryAttribute()
    {
        return $this->products->map(function ($product) {
            return [
                'name' => $product->name,
                'price' => $product->price,
                'quantity' => $product->pivot->quantity,
                'subtotal' => $product->price * $product->pivot->quantity,
            ];
        });
    }

    public static function getSalesSummary($date = null)
    {
        $date = $date ?? now();

        return \Illuminate\Support\Facades\DB::table('transactions')
            ->whereDate('transactions.created_at', $date)
            ->join('carts', 'transactions.cart_id', '=', 'carts.id')
            ->join('cart_products', 'carts.id', '=', 'cart_products.cart_id')
            ->join('products', 'cart_products.product_id', '=', 'products.id')
            ->select(
                'products.id',
                'products.name',
                'products.price',
                \Illuminate\Support\Facades\DB::raw('SUM(cart_products.quantity) as total_sold'),
                \Illuminate\Support\Facades\DB::raw('SUM(cart_products.quantity * products.price) as total_revenue')
            )
            ->groupBy('products.id', 'products.name', 'products.price')
            ->get();
    }
}
