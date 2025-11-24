import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, products }) {
    console.log('Admin Products:', products); // Debugging

    const removeItem = (product) => {
        if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
            router.delete(route('admin.products.destroy', product.id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Admin Products</h2>}
        >
            <Head title="Admin Products" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-zinc-900 overflow-hidden shadow-lg shadow-green-900/20 sm:rounded-lg border border-green-900/50">
                        <div className="p-6 text-zinc-300">
                            {products.data && products.data.length > 0 ? (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="border-b border-zinc-700 text-zinc-400 font-mono text-sm uppercase tracking-wider">
                                                    <th className="pb-4 pl-4">Image</th>
                                                    <th className="pb-4">Product</th>
                                                    <th className="pb-4">Price</th>
                                                    <th className="pb-4">Stock</th>
                                                    <th className="pb-4 text-right pr-4">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-zinc-800">
                                                {products.data.map((product) => (
                                                    <tr key={product.id} className="group hover:bg-zinc-800/50 transition-colors">
                                                        <td className="py-4 pl-4">
                                                            <div className="h-16 w-16 bg-zinc-800 rounded overflow-hidden border border-zinc-700 flex items-center justify-center">
                                                                <Link href={route('admin.products.edit', product.id)} className="block h-full w-full">
                                                                    {product.images && product.images.length > 0 ? (
                                                                        <img
                                                                            src={`/storage/${product.images[0].path}`}
                                                                            alt={product.name}
                                                                            className="h-full w-full object-cover"
                                                                        />
                                                                    ) : (
                                                                        <span className="text-xs text-zinc-500 font-mono flex items-center justify-center h-full">No Img</span>
                                                                    )}
                                                                </Link>
                                                            </div>
                                                        </td>
                                                        <td className="py-4">
                                                            <Link href={route('admin.products.edit', product.id)} className="font-bold text-green-400 hover:text-green-300 transition-colors">
                                                                {product.name}
                                                            </Link>
                                                        </td>
                                                        <td className="py-4 text-zinc-300">${product.price}</td>
                                                        <td className="py-4 text-zinc-300 font-mono">{product.stock}</td>
                                                        <td className="py-4 text-right pr-4">
                                                            <Link
                                                                href={route('admin.products.edit', product.id)}
                                                                className="text-green-400 hover:text-green-300 transition-colors font-mono text-sm uppercase tracking-wider mr-4"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button
                                                                onClick={() => removeItem(product)}
                                                                className="text-red-500 hover:text-red-400 transition-colors font-mono text-sm uppercase tracking-wider"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* Pagination Links could go here */}
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-zinc-400 text-lg mb-6">No Products Found.</p>
                                    <Link
                                        href={route('products.create')}
                                        className="inline-block bg-green-700 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors shadow-lg shadow-green-900/50 font-mono uppercase tracking-wider font-bold"
                                    >
                                        Create Product
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
