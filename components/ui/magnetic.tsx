"use client";

import type {
  ComponentPropsWithoutRef,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils/cn";

type QuickTo = (value: number) => gsap.core.Tween;

type MagneticProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
  disabled?: boolean;
  innerClassName?: string;
  maxOffset?: number;
  strength?: number;
};

export function Magnetic({
  children,
  className,
  disabled = false,
  innerClassName,
  maxOffset = 18,
  strength = 0.18,
  onPointerCancel,
  onPointerEnter,
  onPointerLeave,
  onPointerMove,
  ...props
}: MagneticProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const xToRef = useRef<QuickTo | null>(null);
  const yToRef = useRef<QuickTo | null>(null);
  const scaleToRef = useRef<QuickTo | null>(null);
  const canAnimateRef = useRef(false);

  useEffect(() => {
    if (!innerRef.current) {
      return;
    }

    const pointerQuery = window.matchMedia("(pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncCapability = () => {
      canAnimateRef.current =
        !disabled && pointerQuery.matches && !motionQuery.matches;

      if (!canAnimateRef.current) {
        gsap.set(innerRef.current, { scale: 1, x: 0, y: 0 });
      }
    };

    syncCapability();

    const ctx = gsap.context(() => {
      const target = innerRef.current;

      if (!target) {
        return;
      }

      xToRef.current = gsap.quickTo(target, "x", {
        duration: 0.35,
        ease: "power3.out",
      });
      yToRef.current = gsap.quickTo(target, "y", {
        duration: 0.35,
        ease: "power3.out",
      });
      scaleToRef.current = gsap.quickTo(target, "scale", {
        duration: 0.3,
        ease: "power2.out",
      });
    }, rootRef);

    const subscribe = (query: MediaQueryList) => {
      query.addEventListener("change", syncCapability);

      return () => {
        query.removeEventListener("change", syncCapability);
      };
    };

    const unsubscribePointer = subscribe(pointerQuery);
    const unsubscribeMotion = subscribe(motionQuery);

    return () => {
      unsubscribePointer();
      unsubscribeMotion();
      ctx.revert();
    };
  }, [disabled]);

  const reset = () => {
    xToRef.current?.(0);
    yToRef.current?.(0);
    scaleToRef.current?.(1);
  };

  const handlePointerEnter = (event: ReactPointerEvent<HTMLDivElement>) => {
    onPointerEnter?.(event);

    if (!canAnimateRef.current || event.pointerType !== "mouse") {
      return;
    }

    scaleToRef.current?.(1.02);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    onPointerMove?.(event);

    if (!canAnimateRef.current || event.pointerType !== "mouse") {
      return;
    }

    const root = rootRef.current;

    if (!root) {
      return;
    }

    const bounds = root.getBoundingClientRect();
    const offsetX = event.clientX - (bounds.left + bounds.width / 2);
    const offsetY = event.clientY - (bounds.top + bounds.height / 2);
    const distance = Math.hypot(offsetX, offsetY);
    const radius = Math.max(bounds.width, bounds.height) / 2 || 1;
    const falloff = Math.min(1, distance / radius);

    const x = gsap.utils.clamp(
      -maxOffset,
      maxOffset,
      offsetX * strength * (0.65 + falloff * 0.35),
    );
    const y = gsap.utils.clamp(
      -maxOffset,
      maxOffset,
      offsetY * strength * (0.65 + falloff * 0.35),
    );

    xToRef.current?.(x);
    yToRef.current?.(y);
  };

  const handlePointerLeave = (event: ReactPointerEvent<HTMLDivElement>) => {
    onPointerLeave?.(event);
    reset();
  };

  const handlePointerCancel = (event: ReactPointerEvent<HTMLDivElement>) => {
    onPointerCancel?.(event);
    reset();
  };

  return (
    <div
      ref={rootRef}
      className={cn("relative", className)}
      onPointerCancel={handlePointerCancel}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      {...props}
    >
      <div
        ref={innerRef}
        className={cn("will-change-transform", innerClassName)}
      >
        {children}
      </div>
    </div>
  );
}
