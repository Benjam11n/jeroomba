import { cva, type VariantProps } from "class-variance-authority";
import {
  Children,
  cloneElement,
  isValidElement,
  type ComponentPropsWithoutRef,
} from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-foreground px-5 py-3 text-background hover:-translate-y-0.5 hover:opacity-95",
        outline:
          "border border-border bg-background/85 px-5 py-3 text-foreground hover:-translate-y-0.5 hover:border-foreground/25",
        ghost:
          "px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground",
      },
      size: {
        default: "",
        sm: "h-9 px-3 py-2 text-sm",
        lg: "h-12 px-5 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  asChild = false,
  children,
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  const buttonClassName = cn(buttonVariants({ variant, size }), className);

  if (asChild) {
    const child = Children.only(children);

    if (!isValidElement<{ className?: string }>(child)) {
      return null;
    }

    return cloneElement(child, {
      ...props,
      className: cn(buttonClassName, child.props.className),
    });
  }

  return (
    <button
      type={type}
      className={buttonClassName}
      {...props}
    >
      {children}
    </button>
  );
}
