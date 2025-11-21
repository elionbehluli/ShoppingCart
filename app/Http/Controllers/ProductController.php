<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(): Response
    {
        $products = Product::all();
        return Inertia::render('Products/Index', [
            'products' => $products
        ]);
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
    {
        Product::create([
            'name' => $request['name'],
            'price' => $request['price'],
            'stock' => $request['stock']
        ]);

        return redirect(route('dashboard', absolute: false));
    }

    public function create(): Response
    {
        return Inertia::render('Products/Create', []);
    }
}
