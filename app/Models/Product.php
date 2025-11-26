<?php

namespace App\Models;

use App\Jobs\SendLowStockEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property mixed $id
 */
class Product extends Model
{
    use HasFactory;

    public const LOW_STOCK = 3;
    protected $fillable = [
        'id',
        'name',
        'price',
        'stock',
        'description'
    ];

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    private function isLowStock(): bool
    {
        return $this->stock < self::LOW_STOCK;
    }

    public function decrementStock($quantity): void
    {
        //check if product was already on low stock
        $already_low_stock = $this->isLowStock();

        $this->decrement('stock', $quantity);

        if ($this->isLowStock() && !$already_low_stock) {
            SendLowStockEmail::dispatch($this);
        }
    }
}
