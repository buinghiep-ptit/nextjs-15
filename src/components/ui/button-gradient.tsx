import { Button } from "./button";
import { cn } from "@/lib/utils";

export function ButtonGradient({
  className,
  children,
  isOutlined,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
}) {
  const baseClasses = `${
    isOutlined ? "" : "hover:scale-105"
  } px-8 py-3 font-medium transition-all duration-300 ease-in-out`;
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
