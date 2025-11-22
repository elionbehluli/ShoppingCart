import { Head, Link, router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
export default function Index({ auth, products }) {
    return (
        <>
            <Head title="Products" />
            <div className="min-h-screen bg-black text-white">
                <nav className="bg-zinc-900 border-b border-green-900 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="shrink-0 flex items-center">
                                    <Link href="/" className="text-xl font-bold text-gray-800 dark:text-white">
                                        ShoppingCart
                                    </Link>
                                </div>
                                <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                    <Link
                                        href={route('products.index')}
                                        className="inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 text-sm font-medium leading-5 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out"
                                    >
                                        Products
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="text-sm text-gray-700 dark:text-gray-300 underline"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-sm text-gray-700 dark:text-gray-300 underline"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="ml-4 text-sm text-gray-700 dark:text-gray-300 underline"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <h1 className="text-2xl font-semibold mb-6">Our Products</h1>

                                {products.data.length === 0 ? (
                                    <p className="text-gray-500">No products available at the moment.</p>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                                            {products.data.map((product) => (
                                                <Link
                                                    key={product.id}
                                                    href={route('products.show', product.id)}
                                                    className="block h-full"
                                                >
                                                    <div className="border rounded-xl p-4 shadow-lg shadow-green-900/10 hover:shadow-green-500/20 transition-all duration-300 bg-zinc-900 border-green-900/50 group h-full flex flex-col">
                                                        <div className="h-48 bg-zinc-800 rounded-lg mb-4 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-300 border border-zinc-700 overflow-hidden">
                                                            {product.images && product.images.length > 0 ? (
                                                                <img
                                                                    src={`/storage/${product.images[0].path}`}
                                                                    alt={product.name}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            ) : (
                                                                <span className="text-green-500/50 font-mono">Image Placeholder</span>
                                                            )}
                                                        </div>
                                                        <h2 className="text-lg font-bold mb-2 text-white font-mono">{product.name}</h2>
                                                        <p className="text-green-400 mb-2 font-mono">Price: ${product.price}</p>
                                                        <p className="text-sm text-zinc-400 font-mono">Stock: {product.stock}</p>
                                                        {auth.user &&
                                                            <button
                                                                className="mt-auto w-full bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors shadow-lg shadow-green-900/50 font-mono uppercase tracking-wider text-sm z-10 relative"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    router.post(route('cart.add', product.id));
                                                                }}
                                                            >
                                                                Add to Cart
                                                            </button>
                                                        }
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>

                                        {/* Pagination */}
                                        <div className="flex justify-center mt-8">
                                            <div className="flex gap-2">
                                                {products.links.map((link, index) => (
                                                    link.url ? (
                                                        <Link
                                                            key={index}
                                                            href={link.url}
                                                            className={`px-4 py-2 rounded-lg border ${link.active
                                                                ? 'bg-green-700 text-white border-green-600'
                                                                : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                                                                }`}
                                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                                            preserveScroll
                                                        />
                                                    ) : (
                                                        <span
                                                            key={index}
                                                            className="px-4 py-2 rounded-lg border bg-zinc-800 text-zinc-500 border-zinc-700 cursor-not-allowed opacity-50"
                                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                                        />
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
