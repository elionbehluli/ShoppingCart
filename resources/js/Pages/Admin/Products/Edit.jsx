import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function Edit({ auth, product }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: 'PUT',
        name: product.name || '',
        price: product.price || 0.0,
        stock: product.stock || 0,
        description: product.description || '',
        images: []
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.products.update', product.id), {
            forceFormData: true,
        });
    };

    const deleteProduct = () => {
        if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
            router.delete(route('admin.products.destroy', product.id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Edit Product</h2>}
        >
            <Head title="Edit Product" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-zinc-900 overflow-hidden shadow-lg shadow-green-900/20 sm:rounded-lg border border-green-900/50">
                        <div className="p-6 text-zinc-300">
                            <form onSubmit={submit} encType="multipart/form-data">
                                <div>
                                    <InputLabel htmlFor="name" value="Name" />

                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="price" value="Price" />

                                    <TextInput
                                        id="price"
                                        type="number"
                                        name="price"
                                        value={data.price}
                                        className="mt-1 block w-full"
                                        autoComplete="0.0"
                                        onChange={(e) => setData('price', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.price} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="stock" value="Stock" />

                                    <TextInput
                                        id="stock"
                                        type="number"
                                        name="stock"
                                        value={data.stock}
                                        className="mt-1 block w-full"
                                        autoComplete="0"
                                        onChange={(e) => setData('stock', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.stock} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="description" value="Description" />

                                    <textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full rounded-md border-green-900 bg-zinc-800 text-white shadow-sm focus:border-green-500 focus:ring-green-500"
                                        onChange={(e) => setData('description', e.target.value)}
                                    />

                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                {/* Existing Images */}
                                {product.images && product.images.length > 0 && (
                                    <div className="mt-4">
                                        <InputLabel value="Existing Images" />
                                        <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                            {product.images.map((image) => (
                                                <div key={image.id} className="relative group">
                                                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-zinc-800 border border-zinc-700">
                                                        <img
                                                            src={`/storage/${image.path}`}
                                                            alt="Product"
                                                            className="h-24 w-full object-cover object-center"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="mt-4">
                                    <InputLabel htmlFor="images" value="Add New Images" />
                                    <input
                                        id="images"
                                        type="file"
                                        multiple
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                        onChange={(e) => {
                                            const newFiles = Array.from(e.target.files);
                                            setData('images', [...data.images, ...newFiles]);
                                        }}
                                    />
                                    <InputError message={errors.images} className="mt-2" />

                                    {/* New Image Previews */}
                                    {data.images.length > 0 && (
                                        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                            {data.images.map((file, index) => (
                                                <div key={index} className="relative group">
                                                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-zinc-800 border border-zinc-700">
                                                        <img
                                                            src={URL.createObjectURL(file)}
                                                            alt={`Preview ${index}`}
                                                            className="h-24 w-full object-cover object-center"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const newImages = data.images.filter((_, i) => i !== index);
                                                                setData('images', newImages);
                                                            }}
                                                            className="absolute top-1 right-1 rounded-full bg-red-600 p-1 text-white shadow-sm hover:bg-red-500 focus:outline-none"
                                                        >
                                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <p className="mt-1 text-xs text-zinc-400 truncate">{file.name}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={deleteProduct}
                                        className="text-red-400 hover:text-red-300 transition-colors font-mono text-sm uppercase tracking-wider"
                                    >
                                        Delete Product
                                    </button>

                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Save Changes
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
