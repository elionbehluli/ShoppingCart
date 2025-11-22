import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-black text-white">
            <Navbar />
            <div className="flex-grow flex flex-col justify-center items-center w-full sm:pt-0">
                <div>
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-green-500" />
                    </Link>
                </div>

                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-zinc-900 shadow-md overflow-hidden sm:rounded-lg border border-green-900/50">
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    );
}
