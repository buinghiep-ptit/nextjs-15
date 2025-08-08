import React, { forwardRef, JSX } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// Color variants using your design tokens
const colorVariants = cva("", {
  variants: {
    variant: {
      default: "text-foreground",
      primary: "text-primary",
      secondary: "text-secondary-foreground",
      muted: "text-muted-foreground",
      destructive: "text-destructive",
      success: "text-green-600 dark:text-green-400",
      warning: "text-yellow-600 dark:text-yellow-400",
      info: "text-blue-600 dark:text-blue-400",
      accent: "text-accent-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

// Enhanced component creator with color variants
const createTypographyComponent = <T extends HTMLElement>(
  tag: keyof JSX.IntrinsicElements,
  baseClassName: string,
  displayName: string
) => {
  interface ComponentProps
    extends React.HTMLAttributes<T>,
      VariantProps<typeof colorVariants> {}

  const Component = forwardRef<T, ComponentProps>(
    ({ variant, className, ...props }, ref) => {
      return React.createElement(
        tag,
        {
          ...props,
          ref,
          className: cn(baseClassName, colorVariants({ variant }), className),
        },
        props.children
      );
    }
  );
  Component.displayName = displayName;
  return Component;
};

// Typography components with color variants
export const H1 = createTypographyComponent<HTMLHeadingElement>(
  "h1",
  "scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl",
  "H1"
);

export const H2 = createTypographyComponent<HTMLHeadingElement>(
  "h2",
  "scroll-m-20 py-2 text-4xl font-semibold tracking-tight first:mt-0",
  "H2"
);

export const H3 = createTypographyComponent<HTMLHeadingElement>(
  "h3",
  "scroll-m-20 text-3xl font-semibold tracking-tight",
  "H3"
);

export const H4 = createTypographyComponent<HTMLHeadingElement>(
  "h4",
  "scroll-m-20 text-xl font-semibold tracking-tight",
  "H4"
);

export const Lead = createTypographyComponent<HTMLParagraphElement>(
  "p",
  "text-xl",
  "Lead"
);

export const P = createTypographyComponent<HTMLParagraphElement>(
  "p",
  "leading-7 not-first:mt-6",
  "P"
);

export const Large = createTypographyComponent<HTMLDivElement>(
  "div",
  "text-lg font-semibold",
  "Large"
);

export const Small = createTypographyComponent<HTMLParagraphElement>(
  "p",
  "text-sm font-medium leading-none",
  "Small"
);

export const Muted = createTypographyComponent<HTMLSpanElement>(
  "span",
  "text-sm",
  "Muted"
);

export const InlineCode = createTypographyComponent<HTMLSpanElement>(
  "code",
  "relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
  "InlineCode"
);

export const MultilineCode = createTypographyComponent<HTMLPreElement>(
  "pre",
  "relative rounded-sm bg-muted p-4 font-mono text-sm font-semibold overflow-x-auto",
  "MultilineCode"
);

export const List = createTypographyComponent<HTMLUListElement>(
  "ul",
  "my-6 ml-6 list-disc [&>li]:mt-2",
  "List"
);

export const Quote = createTypographyComponent<HTMLQuoteElement>(
  "blockquote",
  "mt-6 border-l-2 pl-6 italic",
  "Quote"
);

// Export color variants for external use
export { colorVariants };
export type ColorVariant = VariantProps<typeof colorVariants>["variant"];
