import { Button } from "./button";
import { cn } from "@/lib/utils";

export function ButtonGradientOutlined({
  className,
  children,
  isActive,
  isCircle = true,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isActive?: boolean;
  isCircle?: boolean;
}) {
  const baseStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.50)",
  };

  return (
    <div
      className={cn(
        "p-0.25 inline-block transition-all duration-300 ease-in-out hover:scale-105",
        isCircle ? "rounded-full" : "rounded-lg"
      )}
      style={{
        background: !isActive
          ? "linear-gradient(316deg, rgba(255, 47, 193, 0.20) -11.37%, rgba(116, 77, 241, 0.20) 63.98%, rgba(0, 0, 85, 0.20) 113.46%)"
          : "#6A46DB",
      }}
    >
      <Button
        {...props}
        variant="ghost"
        className={cn(
          "text-xs sm:text-sm",
          className,
          isActive ? "text-white hover:text-white hover:bg-[#6A46DB]" : ""
        )}
        style={!isActive ? baseStyle : {}}
      >
        {children}
      </Button>
    </div>
  );
}
