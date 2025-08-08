/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { JSX } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// FlexBox Component
const flexVariants = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      column: "flex-col",
      "row-reverse": "flex-row-reverse",
      "column-reverse": "flex-col-reverse",
    },
    justify: {
      start: "justify-start",
      end: "justify-end",
      center: "justify-center",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    align: {
      start: "items-start",
      end: "items-end",
      center: "items-center",
      baseline: "items-baseline",
      stretch: "items-stretch",
    },
    wrap: {
      nowrap: "flex-nowrap",
      wrap: "flex-wrap",
      reverse: "flex-wrap-reverse",
    },
    gap: {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
      12: "gap-12",
      16: "gap-16",
    },
  },
  defaultVariants: {
    direction: "row",
    justify: "start",
    align: "start",
    wrap: "nowrap",
    gap: 0,
  },
});

export interface FlexBoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {
  as?: keyof JSX.IntrinsicElements;
}

export const FlexBox = React.forwardRef<HTMLDivElement, FlexBoxProps>(
  (
    { className, direction, justify, align, wrap, gap, as = "div", ...props },
    ref
  ) => {
    const Component = as as any;
    return (
      <Component
        className={cn(
          flexVariants({ direction, justify, align, wrap, gap }),
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
FlexBox.displayName = "FlexBox";

// GridBox Component
const gridVariants = cva("grid", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      12: "grid-cols-12",
      none: "grid-cols-none",
    },
    rows: {
      1: "grid-rows-1",
      2: "grid-rows-2",
      3: "grid-rows-3",
      4: "grid-rows-4",
      5: "grid-rows-5",
      6: "grid-rows-6",
      none: "grid-rows-none",
    },
    gap: {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
      12: "gap-12",
      16: "gap-16",
    },
    justify: {
      start: "justify-start",
      end: "justify-end",
      center: "justify-center",
      stretch: "justify-stretch",
    },
    align: {
      start: "items-start",
      end: "items-end",
      center: "items-center",
      stretch: "items-stretch",
    },
  },
  defaultVariants: {
    cols: 1,
    gap: 0,
  },
});

export interface GridBoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  as?: keyof JSX.IntrinsicElements;
}

export const GridBox = React.forwardRef<HTMLDivElement, GridBoxProps>(
  (
    { className, cols, rows, gap, justify, align, as = "div", ...props },
    ref
  ) => {
    const Component = as as any;
    return (
      <Component
        className={cn(
          gridVariants({ cols, rows, gap, justify, align }),
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
GridBox.displayName = "GridBox";

// Box - Universal container
const boxVariants = cva("", {
  variants: {
    p: {
      0: "p-0",
      1: "p-1",
      2: "p-2",
      3: "p-3",
      4: "p-4",
      5: "p-5",
      6: "p-6",
      8: "p-8",
      10: "p-10",
      12: "p-12",
      16: "p-16",
    },
    m: {
      0: "m-0",
      1: "m-1",
      2: "m-2",
      3: "m-3",
      4: "m-4",
      5: "m-5",
      6: "m-6",
      8: "m-8",
      10: "m-10",
      12: "m-12",
      16: "m-16",
      auto: "m-auto",
    },
    w: {
      auto: "w-auto",
      full: "w-full",
      screen: "w-screen",
      fit: "w-fit",
      min: "w-min",
      max: "w-max",
    },
    h: {
      auto: "h-auto",
      full: "h-full",
      screen: "h-screen",
      fit: "h-fit",
      min: "h-min",
      max: "h-max",
    },
  },
});

export interface BoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {
  as?: keyof JSX.IntrinsicElements;
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ className, p, m, w, h, as = "div", ...props }, ref) => {
    const Component = as as any;
    return (
      <Component
        className={cn(boxVariants({ p, m, w, h }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Box.displayName = "Box";

// Stack - Vertical layout with gap
export interface StackProps extends FlexBoxProps {
  spacing?: VariantProps<typeof flexVariants>["gap"];
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ spacing, ...props }, ref) => {
    return <FlexBox direction="column" gap={spacing} ref={ref} {...props} />;
  }
);
Stack.displayName = "Stack";

// HStack - Horizontal layout with gap
export interface HStackProps extends FlexBoxProps {
  spacing?: VariantProps<typeof flexVariants>["gap"];
}

export const HStack = React.forwardRef<HTMLDivElement, HStackProps>(
  ({ spacing, ...props }, ref) => {
    return <FlexBox direction="row" gap={spacing} ref={ref} {...props} />;
  }
);
HStack.displayName = "HStack";

// Center - Center content both ways
export const Center = React.forwardRef<HTMLDivElement, FlexBoxProps>(
  (props, ref) => {
    return <FlexBox justify="center" align="center" ref={ref} {...props} />;
  }
);
Center.displayName = "Center";

// Spacer - Fill available space
export const Spacer = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ className, ...props }, ref) => {
    return <Box className={cn("flex-1", className)} ref={ref} {...props} />;
  }
);
Spacer.displayName = "Spacer";

// Divider - Visual separator
const dividerVariants = cva("", {
  variants: {
    orientation: {
      horizontal: "w-full h-px bg-border",
      vertical: "h-full w-px bg-border",
    },
    variant: {
      solid: "bg-border",
      dashed: "border-dashed border-t border-border bg-transparent",
      dotted: "border-dotted border-t border-border bg-transparent",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    variant: "solid",
  },
});

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation, variant, ...props }, ref) => {
    return (
      <div
        className={cn(dividerVariants({ orientation, variant }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Divider.displayName = "Divider";

// AspectRatio - Maintain aspect ratio
const aspectRatioVariants = cva("relative w-full", {
  variants: {
    ratio: {
      "1/1": "aspect-square",
      "4/3": "aspect-[4/3]",
      "3/2": "aspect-[3/2]",
      "16/9": "aspect-video",
      "21/9": "aspect-[21/9]",
    },
  },
  defaultVariants: {
    ratio: "16/9",
  },
});

export interface AspectRatioProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof aspectRatioVariants> {}

export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ className, ratio, children, ...props }, ref) => {
    return (
      <div
        className={cn(aspectRatioVariants({ ratio }), className)}
        ref={ref}
        {...props}
      >
        <div className="absolute inset-0">{children}</div>
      </div>
    );
  }
);
AspectRatio.displayName = "AspectRatio";
