<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Ramsey\Uuid\Uuid;

use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $cart = $user->cart;
        $products = $cart ? $cart->products : [];
        $total = $products->sum(function ($product) {
            return $product->price * $product->pivot->quantity;
        });

        return Inertia::render('Cart/Index', [
            'products' => $products,
            'total' => $total
        ]);
    }

    public function add(Request $request, Product $product)
    {
        $request->validate([
            'quantity' => 'integer|min:1'
        ]);

        $user = Auth::user();
        $uuid = (string) Uuid::uuid4();
        $cart = $user->cart ?? Cart::create(['user_id' => $user->id, 'uuid' => $uuid]);

        $quantity = $request->input('quantity', 1);

        if ($cart->products()->where('product_id', $product->id)->exists()) {
            $cart->products()->updateExistingPivot($product->id, [
                'quantity' => \DB::raw("quantity + $quantity")
            ]);
        } else {
            $cart->products()->attach($product->id, ['quantity' => $quantity]);
        }

        return back()->with('success', 'Product added to cart!');
    }
}
