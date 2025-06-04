export default function Button({
    variant = "primary",
    className,
    Component,
    children,
    ...props
}) {
    const variantClasses = {
        primary:
            "rounded-md bg-teal-50 pt-1 pr-3 pb-1 pl-3 font-medium text-teal-700 transition-colors duration-200 hover:cursor-pointer hover:bg-teal-100",
        secondary:
            "rounded-md pt-1 pr-3 pb-1 pl-3 font-medium text-white transition-colors duration-200 hover:cursor-pointer hover:bg-[rgba(0,0,0,0.1)]",
    }[variant];

    return Component ? (
        <Component className={`${variantClasses} ${className}`} {...props}>
            {children}
        </Component>
    ) : (
        <button className={`${variantClasses} ${className}`} {...props}>
            {children}
        </button>
    );
}
