<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    const STATUS_CREATED = 1;
    const STATUS_USED = 2;

    protected $fillable = [
        'uuid',
        'user_id',
        'status',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'cart_products')->withPivot('id', 'quantity')->withTimestamps();
    }

    public function getTotal(): float
    {
        $products = $this->products;
        return !empty($products) ? $products->sum(function ($product) {
            return $product->price * $product->pivot->quantity;
        }) : 0.0;
    }
}
