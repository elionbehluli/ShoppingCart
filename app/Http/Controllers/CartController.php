<?php

namespace App\Http\Controllers;

use App\Jobs\SendLowStockEmail;
use App\Models\Cart;
use App\Models\CartProduct;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Ramsey\Uuid\Uuid;

use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $cart = $user->cart()->where('status', Cart::STATUS_CREATED)->first();
        $products = $cart ? $cart->products()->with('images')->get() : [];
        $total = $cart ? $cart->getTotal() : 0.0;

        return Inertia::render('Cart/Index', [
            'products' => $products,
            'total' => $total,
            'cart' => $cart
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $user = Auth::user();
        $cart = $user->cart()->where('status', Cart::STATUS_CREATED)->first();

        if ($cart && $cart->products()->where('product_id', $product->id)->exists()) {
            if ($product->stock < $request->quantity) {
                return back()->withErrors(['quantity' => 'Requested quantity exceeds stock.']);
            }
            $cart->products()->updateExistingPivot($product->id, [
                'quantity' => $request->quantity
            ]);
        }

        return back();
    }

    public function remove(CartProduct $cartProduct)
    {
        $user = Auth::user();

        if ($cartProduct->cart->user_id !== $user->id) {
            abort(403);
        }

        $cartProduct->delete();

        return back()->with('success', 'Product removed from cart!');
    }

    public function add(Request $request, Product $product)
    {
        $request->validate([
            'quantity' => 'integer|min:1'
        ]);

        $user = Auth::user();
        $cart = $user->cart()
            ->where('status', CART::STATUS_CREATED)
            ->first();

        if (!$cart) {
            $uuid = (string) Uuid::uuid4();
            $cart = Cart::create(['user_id' => $user->id, 'uuid' => $uuid]);
        }

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

    public function checkout(Request $request)
    {
        $request->validate([
            'cart' => 'required|exists:carts,id'
        ]);

        $user = Auth::user();
        /* @var Cart $cart */
        $cart = Cart::findOrFail($request->cart);

        if ($cart->user_id !== $user->id) {
            abort(403, 'Unauthorized action.');
        }

        if ($cart->status === Cart::STATUS_USED) {
            return back()->withErrors(['cart' => 'This cart has already been checked out.']);
        }


        $total = 0;
        foreach ($cart->products as $product) {
            /* @var Product $product */
            $quantityToBuy = min($product->pivot->quantity, $product->stock);

            if ($quantityToBuy > 0) {
                $total += $quantityToBuy * $product->price;
                $product->decrementStock($quantityToBuy);
            }
        }


        try {
            Transaction::create([
                'tid' => (string) Uuid::uuid4(),
                'buyer_id' => $user->id,
                'cart_id' => $cart->id,
                'price' => $total
            ]);
        } catch (\Exception $exception) {
            return back()->withErrors([$exception->getMessage()]);
        }

        $cart->update(['status' => Cart::STATUS_USED]);

        return back()->with('success', 'Checkout successful!');
    }
}
