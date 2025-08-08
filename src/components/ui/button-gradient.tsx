import { Button } from "./button";
import { cn } from "@/lib/utils";

export function ButtonGradient({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const baseClasses =
    "px-8 py-3 text-white font-medium transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg";
  const baseStyle = {
    borderRadius: "360px",
    background:
      "linear-gradient(316deg, #FF2FC1 -11.37%, #744DF1 63.98%, #005 113.46%)",
  };

  return (
    <Button {...props} className={cn(baseClasses, className)} style={baseStyle}>
      {children}
    </Button>
  );
}
