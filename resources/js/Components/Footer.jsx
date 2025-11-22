import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="bg-zinc-900 border-t border-green-900/50 text-zinc-400 py-6 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm font-mono">
                &copy; {new Date().getFullYear()} ShoppingCart. All rights reserved.
            </div>
        </footer>
    );
}
