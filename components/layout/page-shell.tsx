import type { ComponentPropsWithoutRef } from "react";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

type PageShellProps = ComponentPropsWithoutRef<"div"> & {
  containerClassName?: string;
};

export function PageShell({
  children,
  className,
  containerClassName,
  ...props
}: PageShellProps) {
  return (
    <div className={cn("pb-24 pt-8 md:pt-16", className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </div>
  );
}
