import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, products, total }) {
    // const total = products.reduce((sum, product) => sum + (product.price * product.pivot.quantity), 0);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Shopping Cart</h2>}
        >
            <Head title="Shopping Cart" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-zinc-900 overflow-hidden shadow-lg shadow-green-900/20 sm:rounded-lg border border-green-900/50">
                        <div className="p-6 text-white">
                            {products.length > 0 ? (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="border-b border-zinc-700 text-zinc-400 font-mono text-sm uppercase tracking-wider">
                                                    <th className="pb-4">Product</th>
                                                    <th className="pb-4">Price</th>
                                                    <th className="pb-4">Quantity</th>
                                                    <th className="pb-4 text-right">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-zinc-800">
                                                {products.map((product) => (
                                                    <tr key={product.id} className="group hover:bg-zinc-800/50 transition-colors">
                                                        <td className="py-4">
                                                            <Link href={route('products.show', product.id)} className="font-bold text-green-400 hover:text-green-300 transition-colors">
                                                                {product.name}
                                                            </Link>
                                                        </td>
                                                        <td className="py-4 text-zinc-300">${product.price}</td>
                                                        <td className="py-4 text-zinc-300">{product.pivot.quantity}</td>
                                                        <td className="py-4 text-right font-mono text-white">
                                                            ${(product.price * product.pivot.quantity).toFixed(2)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="mt-8 flex justify-end border-t border-zinc-700 pt-8">
                                        <div className="text-right">
                                            <span className="text-zinc-400 font-mono mr-4">Total:</span>
                                            <span className="text-3xl font-bold text-green-400 font-mono">${total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-zinc-400 text-lg mb-6">Your cart is empty.</p>
                                    <Link
                                        href={route('products.index')}
                                        className="inline-block bg-green-700 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors shadow-lg shadow-green-900/50 font-mono uppercase tracking-wider font-bold"
                                    >
                                        Browse Products
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
