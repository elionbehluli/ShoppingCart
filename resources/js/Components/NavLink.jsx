import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-green-500 text-white focus:border-green-700'
                    : 'border-transparent text-zinc-400 hover:text-green-400 hover:border-zinc-700 focus:text-zinc-200 focus:border-zinc-700') +
                className
            }
        >
            {children}
        </Link>
    );
}
