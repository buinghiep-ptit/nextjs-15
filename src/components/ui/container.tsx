/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { JSX } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const containerVariants = cva("w-full mx-auto px-4 sm:px-6 lg:px-8", {
  variants: {
    maxWidth: {
      xs: "max-w-sm", // ~475px
      sm: "max-w-md", // ~640px
      md: "max-w-[835px]", // ~768px
      lg: "max-w-[1234px]", // 1170px custom px-8
      xl: "max-w-[1362px]", // ~1280px
      "2xl": "max-w-[1442px]", // ~1536px
      false: "max-w-none",
    },
    disableGutters: {
      true: "px-0",
      false: "",
    },
    fixed: {
      true: "max-w-[1234px]",
      false: "",
    },
  },
  defaultVariants: {
    maxWidth: "lg",
    disableGutters: false,
    fixed: false,
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  component?: keyof JSX.IntrinsicElements;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      className,
      maxWidth,
      disableGutters,
      fixed,
      component = "div",
      children,
      ...props
    },
    ref
  ) => {
    const Component = component as any;

    return (
      <Component
        className={cn(
          containerVariants({
            maxWidth: fixed ? false : maxWidth,
            disableGutters,
          }),
          fixed && "max-w-[1234px]",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = "Container";

export { Container, containerVariants };
