import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Show({ auth, product }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        if (product.images && product.images.length > 0) {
            setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
        }
    };

    const prevImage = () => {
        if (product.images && product.images.length > 0) {
            setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Product Details</h2>}
        >
            <Head title={product.name} />
            <h1>TESTing</h1>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-zinc-900 overflow-hidden shadow-lg shadow-green-900/20 sm:rounded-lg border border-green-900/50">
                        <div className="p-6 text-white grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Image Carousel */}
                            <div className="relative h-96 bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 flex items-center justify-center group">
                                {product.images && product.images.length > 0 ? (
                                    <>
                                        <img
                                            src={`/storage/${product.images[currentImageIndex].path}`}
                                            alt={product.name}
                                            className="h-full w-full object-contain"
                                        />

                                        {product.images.length > 1 && (
                                            <>
                                                <button
                                                    onClick={prevImage}
                                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-green-600/80 text-white p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    ←
                                                </button>
                                                <button
                                                    onClick={nextImage}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-green-600/80 text-white p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    →
                                                </button>
                                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                                                    {product.images.map((_, idx) => (
                                                        <div
                                                            key={idx}
                                                            className={`h-2 w-2 rounded-full ${idx === currentImageIndex ? 'bg-green-500' : 'bg-zinc-600'}`}
                                                        />
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <span className="text-green-500/50 font-mono">No Image Available</span>
                                )}
                            </div>

                            {/* Product Details */}
                            <div className="flex flex-col justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold mb-4 font-mono text-green-400">{product.name}</h1>
                                    <p className="text-2xl font-bold mb-6 text-white">${product.price}</p>

                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold mb-2 text-green-300">Description</h3>
                                        <p className="text-zinc-300 leading-relaxed">
                                            {product.description || "No description available."}
                                        </p>
                                    </div>

                                    <div className="mb-6">
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${product.stock > 0 ? 'bg-green-900/50 text-green-400 border border-green-800' : 'bg-red-900/50 text-red-400 border border-red-800'}`}>
                                            {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex space-x-4">
                                    <button className="flex-1 bg-green-700 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors shadow-lg shadow-green-900/50 font-mono uppercase tracking-wider font-bold">
                                        Add to Cart
                                    </button>
                                    <Link
                                        href={route('products.index')}
                                        className="flex-1 bg-zinc-800 text-white py-3 px-6 rounded-lg hover:bg-zinc-700 transition-colors border border-zinc-700 text-center flex items-center justify-center font-mono"
                                    >
                                        Back to List
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
