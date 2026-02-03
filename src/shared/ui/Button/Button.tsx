import { FC, ButtonHTMLAttributes } from "react";
import style from "./Button.module.css"

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const Button : FC<IButtonProps> = ({children, variant = "primary", size = "md", fullWidth = false, className = "", ...props}) => {

    const classNames = [
        style.button,
        style[variant],
        style[size],
        fullWidth && style.fullWidth,
        className,
    ].filter(Boolean).join(" ");

    return (
    <button className={classNames} {...props}>
        {children}
    </button>
    )
}

export default Button