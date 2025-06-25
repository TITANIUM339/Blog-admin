export default function Switch({ active, size, ...props }) {
    return (
        <button
            className={`rounded-full ${active ? "bg-teal-600" : "bg-gray-300"} hover:not-disabled:cursor-pointer`}
            style={{ width: size * 2, height: size }}
            role="switch"
            aria-checked={active}
            {...props}
        >
            <div
                className={`aspect-square h-full ${active ? "translate-x-full" : null} overflow-hidden p-[4%] transition-transform`}
            >
                <div className="size-full rounded-full bg-white"></div>
            </div>
        </button>
    );
}
