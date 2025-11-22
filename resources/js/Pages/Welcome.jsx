import { Head, Link } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-black text-white selection:bg-green-500 selection:text-white">
                <div className="relative flex min-h-screen flex-col items-center justify-center">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                    </div>

                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl z-10">
                        <Navbar />

                        <main className="mt-16 sm:mt-24 text-center flex-grow">
                            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 font-mono">
                                Future of <span className="text-green-500">Commerce</span>
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-zinc-400 max-w-2xl mx-auto font-mono">
                                Experience the next generation of shopping. Secure, fast, and designed for the digital age. Browse our exclusive collection of premium products.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link
                                    href={route('products.index')}
                                    className="rounded-md bg-green-600 px-8 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-all duration-300 font-mono uppercase tracking-wider shadow-green-900/20 hover:shadow-green-500/20 hover:scale-105"
                                >
                                    Shop Now
                                </Link>
                            </div>
                        </main>
                    </div>
                    <div className="w-full z-10 mt-auto">
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
}
