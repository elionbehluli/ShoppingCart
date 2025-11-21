export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-green-900 bg-zinc-800 text-green-600 shadow-sm focus:ring-green-500 ' +
                className
            }
        />
    );
}
