import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2 font-semibold
      rounded-lg transition-all duration-200 cursor-pointer
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E8FF00]
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    const variantStyles = {
      primary: `
        bg-[#E8FF00] text-[#0A0A0A]
        hover:bg-[#F5FF80] hover:shadow-[0_0_20px_rgba(232,255,0,0.3)]
        active:bg-[#C4D900]
      `,
      secondary: `
        bg-[#0A0A0A] text-[#E8FF00]
        hover:bg-[#262626]
        active:bg-[#171717]
      `,
      outline: `
        bg-transparent border-2 border-[#E8FF00] text-inherit
        hover:bg-[#E8FF00] hover:text-[#0A0A0A]
        active:bg-[#C4D900]
      `,
      ghost: `
        bg-transparent text-inherit
        hover:bg-gray-100 dark:hover:bg-gray-800
        active:bg-gray-200 dark:active:bg-gray-700
      `,
      danger: `
        bg-red-500 text-white
        hover:bg-red-600
        active:bg-red-700
      `,
    };

    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-sm",
      lg: "px-6 py-3 text-base",
    };

    const widthStyles = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          ${baseStyles}
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${widthStyles}
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : leftIcon ? (
          <span className="w-4 h-4">{leftIcon}</span>
        ) : null}

        {children}

        {rightIcon && !isLoading && (
          <span className="w-4 h-4">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
