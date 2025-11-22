<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\CreateProductRequest;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('images')->paginate(12);
        return Inertia::render('Products/Index', [
            'products' => $products
        ]);
    }
    public function create()
    {
        return Inertia::render('Products/Create');
    }

    public function store(CreateProductRequest $request)
    {
        $product = Product::create($request->only('name', 'price', 'stock', 'description'));

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');
                $product->images()->create([
                    'path' => $path,
                    'mime_type' => $image->getClientMimeType(),
                    'size' => $image->getSize()
                ]);
            }
        }

        return redirect()->route('products.index');
    }

    public function show(Product $product)
    {
        $product->load('images');
        return Inertia::render('Products/Show', [
            'product' => $product
        ]);
    }
}
