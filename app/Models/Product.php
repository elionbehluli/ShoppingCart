<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property mixed $id
 */
class Product extends Model
{
    use HasFactory;
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
}
