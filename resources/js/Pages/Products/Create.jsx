import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        price: 0.0,
        stock: 1,
        description: '',
        images: []
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('products.store'), {
            forceFormData: true,
            onFinish: () => reset('name', 'price', 'stock', 'description', 'images')
        });
    };

    return (
        <GuestLayout>
            <Head title="Create Product" />

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

                <div className="mt-4">
                    <InputLabel htmlFor="images" value="Images" />
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

                    {/* Image Previews */}
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

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Create Product
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
