import { Link } from "react-router-dom";

type ButtonProps = {
    submit?: boolean
    text: string
    variant?: "primary" | "secondary"
    icon?: React.ReactNode
    onClick?: () => void
    className?: string
    href?: string

}
export const Button = ({
    submit = false,
    text,
    variant = "primary",
    icon,
    onClick,
    href,
    className = "",
}: ButtonProps) => {
    const buttonVariants = {
        primary: "bg-primary-400 text-notwhite-400 px-5 py-2.5 rounded-md shadow-md shadow-gray-400 "
        ,
        secondary: "bg-secondary-400 text-notwhite-400 w-[50%] px-5 py-2.5 rounded-md shadow-md shadow-gray-400 ",
    }
    const content = (
        <span
            className={`rounded-lg px-4 py-2 flex items-center justify-center cursor-pointer ${buttonVariants[variant]} ${className}`}
        >
            {icon && <span className="text-lg mr-2">{icon}</span>}
            {text}
        </span>
    );

    return href ? (
        <Link to={href} className={className}>
            {content}
        </Link>
    ) : (
        <button onClick={onClick} type={submit ? 'submit' : 'button'} className="w-full">{content}</button>
    );
}

