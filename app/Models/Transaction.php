<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Cart;

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

    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }
}
