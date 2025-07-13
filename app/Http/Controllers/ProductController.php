<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{public function index(Request $request)
{
    $filters = $request->only(['search', 'category']);

    $products = Product::query()
        ->when(isset($filters['search']) && $filters['search'] !== null, fn($q) => $q->where('name', 'like', "%{$filters['search']}%"))
        ->when(isset($filters['category']) && $filters['category'] !== null, fn($q) => $q->where('category', $filters['category']))
        ->get();

    return Inertia::render('Products/Index', [
        'products' => $products,
        'filters' => $filters,
    ]);
}

    public function create()
    {
        return Inertia::render('Products/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:255', 
        ]);

        Product::create($request->only(['name', 'price', 'description', 'category']));

        return redirect()->route('products.index')->with('message', 'Product created successfully');
    }

    public function edit(Product $product)
    {
        return Inertia::render('Products/Edit', compact('product'));
        // the same as return Inertia::render('Products/Edit', ['product' => $product]);

    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:255', 
        ]);

        $product->update($request->only(['name', 'price', 'description', 'category']));

        return redirect()->route('products.index')->with('message', 'Product updated successfully');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('products.index')->with('message', 'Product deleted successfully');
    }
}
