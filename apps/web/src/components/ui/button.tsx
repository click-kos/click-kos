import { cn } from "@/lib/utils";
import type { ReactNode, ButtonHTMLAttributes } from "react";

// Define the variant and size types
type ButtonVariant = "default" | "secondary" | "outline" | "ghost";
type ButtonSize = "default" | "sm" | "lg";

// Define the props interface
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({ 
  children, 
  className, 
  variant = "default", 
  size = "default", 
  ...props 
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variants: Record<ButtonVariant, string> = {
    default: "bg-[#0E2148] text-white hover:bg-[#483AA0] focus:ring-[#483AA0]",
    secondary: "bg-[#7965C1] text-white hover:bg-[#483AA0] focus:ring-[#7965C1]",
    outline: "border border-[#483AA0] text-[#483AA0] hover:bg-[#483AA0] hover:text-white focus:ring-[#483AA0]",
    ghost: "text-[#0E2148] hover:bg-[#7965C1]/10 focus:ring-[#7965C1]",
  };
  
  const sizes: Record<ButtonSize, string> = {
    default: "h-10 py-2 px-4",
    sm: "h-8 px-3 text-xs",
    lg: "h-12 px-8",
  };
  
  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}