import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${active
                    ? 'border-green-500 bg-zinc-800 text-green-400 focus:border-green-700 focus:bg-zinc-700 focus:text-green-300'
                    : 'border-transparent text-zinc-400 hover:border-zinc-300 hover:bg-zinc-800 hover:text-white focus:border-zinc-300 focus:bg-zinc-800 focus:text-white'
                } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
