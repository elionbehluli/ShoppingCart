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
        //get only products with stock bigger than 0
        $products = Product::with('images')
            ->where('stock', '>', 0)
            ->paginate(12);


        return Inertia::render('Products/Index', [
            'products' => $products
        ]);
    }

    public function adminIndex()
    {
        $products = Product::with('images')
            ->paginate(10);

        return Inertia::render('Admin/Products/Index', [
            'products' => $products
        ]);
    }

    public function adminEdit(Product $product)
    {
        $product->load('images');
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product
        ]);
    }

    public function adminUpdate(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'description' => 'required|string',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        $product->update($request->only('name', 'price', 'stock', 'description'));

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

        return redirect()->route('admin.products.index');
    }

    public function destroy(Product $product)
    {
        // Delete images from storage
        foreach ($product->images as $image) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($image->path);
            $image->delete();
        }

        $product->delete();

        return redirect()->route('admin.products.index');
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
