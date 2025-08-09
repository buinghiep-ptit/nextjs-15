import { Button } from "./button";
import { cn } from "@/lib/utils";

export function ButtonGradientOutlined({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const baseStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.50)",
  };
  return (
    <div
      className="p-0.25 rounded-full inline-block transition-all duration-300 ease-in-out hover:scale-105"
      style={{
        background:
          "linear-gradient(316deg, rgba(255, 47, 193, 0.20) -11.37%, rgba(116, 77, 241, 0.20) 63.98%, rgba(0, 0, 85, 0.20) 113.46%)",
      }}
    >
      <Button
        {...props}
        variant="ghost"
        className={cn(className)}
        style={baseStyle}
      >
        {children}
      </Button>
    </div>
  );
}
