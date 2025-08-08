import React, { JSX } from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
}

export const GradientText = React.forwardRef<HTMLElement, GradientTextProps>(
  ({ className, as = "span", style, ...props }, ref) => {
    const Component = as as JSX.ElementType;

    const gradientStyle = {
      background:
        "linear-gradient(316deg, #FF2FC1 -11.37%, #744DF1 63.98%, #005 113.46%)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      ...style,
    };

    return (
      <Component
        className={cn("text-transparent", className)}
        style={gradientStyle}
        ref={ref}
        {...props}
      />
    );
  }
);

GradientText.displayName = "GradientText";
