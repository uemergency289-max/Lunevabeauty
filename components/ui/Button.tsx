"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "gold" | "outline";
}

export default function Button({ variant = "solid", className = "", children, ...props }: ButtonProps) {
  const variants: Record<string, string> = {
    solid: "bg-charcoal text-white",
    gold: "bg-gold text-white",
    outline: "bg-transparent border border-charcoal text-charcoal hover:bg-charcoal hover:text-white",
  };
  return (
    <button
      className={`px-8 py-3.5 text-[13px] tracking-[0.1em] uppercase font-body transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
