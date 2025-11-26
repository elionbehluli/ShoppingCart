<!DOCTYPE html>
<html>
<head>
    <title>Laravel Mail Queue</title>
</head>
<body>
    <h1>Low Stock Alert</h1>
    <p>The product <strong>{{ $product->name }}</strong> is running low on stock.</p>
    <p>Current Stock: {{ $product->stock }}</p>
    
    <p>
        <a href="{{ route('admin.products.edit', $product) }}">
            Edit Product
        </a>
    </p>
</body>
</html>
