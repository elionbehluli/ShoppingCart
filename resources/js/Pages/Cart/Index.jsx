import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, products, total, cart }) {
    const updateQuantity = (product, newQuantity) => {
        if (newQuantity >= 1) {
            router.patch(route('cart.update', product.id), {
                quantity: newQuantity
            }, {
                preserveScroll: true
            });
        }
    };

    const removeItem = (product) => {
        if (confirm('Are you sure you want to remove this item?')) {
            router.delete(route('cart.remove', product.id));
        }
    };

    const handleCheckout = () => {
        if (confirm('Are you sure you want to checkout?')) {
            router.post(route('checkout'), {
                cart: cart.id
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Shopping Cart</h2>}
        >
            <Head title="Shopping Cart" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-zinc-900 overflow-hidden shadow-lg shadow-green-900/20 sm:rounded-lg border border-green-900/50">
                        <div className="p-6 text-zinc-300">
                            {products.length > 0 ? (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="border-b border-zinc-700 text-zinc-400 font-mono text-sm uppercase tracking-wider">
                                                    <th className="pb-4 pl-4">Image</th>
                                                    <th className="pb-4">Product</th>
                                                    <th className="pb-4">Price</th>
                                                    <th className="pb-4">Quantity</th>
                                                    <th className="pb-4 text-right">Total</th>
                                                    <th className="pb-4 text-right pr-4">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-zinc-800">
                                                {products.map((product) => (
                                                    <tr key={product.id} className="group hover:bg-zinc-800/50 transition-colors">
                                                        <td className="py-4 pl-4">
                                                            <div className="h-16 w-16 bg-zinc-800 rounded overflow-hidden border border-zinc-700 flex items-center justify-center">
                                                                {product.images && product.images.length > 0 ? (
                                                                    <img
                                                                        src={`/storage/${product.images[0].path}`}
                                                                        alt={product.name}
                                                                        className="h-full w-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <span className="text-xs text-zinc-500 font-mono">No Img</span>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="py-4">
                                                            <Link href={route('products.show', product.id)} className="font-bold text-green-400 hover:text-green-300 transition-colors">
                                                                {product.name}
                                                            </Link>
                                                        </td>
                                                        <td className="py-4 text-zinc-300">${product.price}</td>
                                                        <td className="py-4 text-zinc-300">
                                                            <div className="flex items-center space-x-2">
                                                                <button
                                                                    onClick={() => updateQuantity(product, product.pivot.quantity - 1)}
                                                                    className="w-8 h-8 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 rounded text-white transition-colors disabled:opacity-50"
                                                                    disabled={product.pivot.quantity <= 1}
                                                                >
                                                                    -
                                                                </button>
                                                                <span className="w-8 text-center font-mono">{product.pivot.quantity}</span>
                                                                <button
                                                                    onClick={() => updateQuantity(product, product.pivot.quantity + 1)}
                                                                    className="w-8 h-8 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 rounded text-white transition-colors"
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 text-right font-mono text-green-400">
                                                            ${(product.price * product.pivot.quantity).toFixed(2)}
                                                        </td>
                                                        <td className="py-4 text-right pr-4">
                                                            <button
                                                                onClick={() => removeItem(product)}
                                                                className="text-red-400 hover:text-red-300 transition-colors font-mono text-sm uppercase tracking-wider"
                                                            >
                                                                Remove
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="mt-8 flex justify-end items-center border-t border-zinc-700 pt-8 gap-6">
                                        <div className="text-right">
                                            <span className="text-zinc-400 font-mono mr-4">Total:</span>
                                            <span className="text-3xl font-bold text-green-400 font-mono">${total.toFixed(2)}</span>
                                        </div>
                                        <button
                                            onClick={handleCheckout}
                                            className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded shadow-lg shadow-green-900/50 transition-all transform hover:scale-105 font-mono uppercase tracking-wider"
                                        >
                                            Checkout
                                        </button>
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
