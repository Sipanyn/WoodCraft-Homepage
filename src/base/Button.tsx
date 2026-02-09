import { clx } from "@/utlities/clx";
import type { JSX, ReactNode } from "react";
type ButtonProps = {
  title?: string | undefined;
  icon?: ReactNode | undefined;
  variant: "primary" | "secondary" | "outlined";
  size: "sm" | "md" | "lg";
  border: "rounded" | "lg";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const baseStyles = "inline-flex items-center justify-center cursor-pointer";

const variants = {
  primary: "bg-wood-dark text-white ",
  secondary: "bg-gray-200 ",
  outlined:
    "border border-gray-300 text-gray-500 dark:border-neutral-700 dark:text-gray-200  dark:hover:border-neutral-600 dark:hover:text-gray-300 hover:shadow-md hover:-translate-y-[1px] transition-all duration-200",
};

const sizes = {
  sm: "p-1",
  md: "px-4 py-1",
  lg: "px-5 py-3",
};
const borders = {
  rounded: "rounded-full",
  lg: "rounded-3xl",
};
const Button: React.FC<ButtonProps> = ({
  title,
  icon,
  variant,
  size,
  border,
  ...props
}): JSX.Element => {
  return (
    <button
      className={clx(
        baseStyles,
        variants[variant],
        sizes[size],
        borders[border],
        "",
      )}
      {...props}
    >
      <p className={`${icon === undefined && "size-7"}`}>{title}</p>
      {icon}
    </button>
  );
};

export default Button;
