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
        images: []
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('products.store'), {
            forceFormData: true,
            onFinish: () => reset('name', 'price', 'stock', 'images')
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
                    <InputLabel htmlFor="images" value="Images" />
                    <input
                        id="images"
                        type="file"
                        multiple
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                        onChange={(e) => setData('images', e.target.files)}
                    />
                    <InputError message={errors.images} className="mt-2" />
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
