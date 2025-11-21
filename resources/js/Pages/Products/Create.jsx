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
        stock: 1
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('products.store'), {
            onFinish: () => reset('name', 'price', 'stock')
        });
    };

    return (
        <GuestLayout>
            <Head title="Create Product" />

            <form onSubmit={submit}>
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
                        type="price"
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
                        type="stock"
                        name="stock"
                        value={data.stock}
                        className="mt-1 block w-full"
                        autoComplete="0"
                        onChange={(e) => setData('stock', e.target.value)}
                        required
                    />

                    <InputError message={errors.price} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
