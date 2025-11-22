import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, products }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Our Products</h2>}
        >
            <Head title="Products" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-zinc-900 overflow-hidden shadow-lg shadow-green-900/20 sm:rounded-lg border border-green-900/50">
                        <div className="p-6 text-white">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium text-green-400 font-mono">Available Items</h3>
                                {auth.user && auth.user.role === 'admin' && (
                                    <Link
                                        href={route('products.create')}
                                        className="bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors shadow-lg shadow-green-900/50 font-mono uppercase tracking-wider font-bold text-sm"
                                    >
                                        Create Product
                                    </Link>
                                )}
                            </div>

                            {products.data.length === 0 ? (
                                <p className="text-zinc-400 font-mono">No products available at the moment.</p>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                                        {products.data.map((product) => (
                                            <Link
                                                key={product.id}
                                                href={route('products.show', product.id)}
                                                className="block h-full"
                                            >
                                                <div className="border rounded-xl p-4 shadow-lg shadow-green-900/10 hover:shadow-green-500/20 transition-all duration-300 bg-zinc-800 border-green-900/30 group h-full flex flex-col">
                                                    <div className="h-48 bg-zinc-900 rounded-lg mb-4 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-300 border border-zinc-700 overflow-hidden">
                                                        {product.images && product.images.length > 0 ? (
                                                            <img
                                                                src={`/storage/${product.images[0].path}`}
                                                                alt={product.name}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <span className="text-green-500/50 font-mono">No Img</span>
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
        </AuthenticatedLayout>
    );
}
