import { Button } from "./button";
import { cn } from "@/lib/utils";

export function ButtonGradientOutlinedGreen({
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
          "linear-gradient(113deg, rgba(39, 190, 255, 0.20) -16.18%, rgba(1, 203, 65, 0.20) 117.89%)",
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
