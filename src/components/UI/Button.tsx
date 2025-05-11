import type { ReactNode, ButtonHTMLAttributes } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: ReactNode;
    width?: "w-full" | "w-fit";
}

const Button = ({ className = "", children, width = "w-full", ...rest }: IProps) => {
    return (
        <button className={`${className} ${width} p-2 w-full rounded-lg text-white cursor-pointer duration-200`} {...rest}>
            {children}
        </button>
    );
};

export default Button;
