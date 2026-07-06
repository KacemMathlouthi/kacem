"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BentoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export default function AbhinavBentoButton({
  className,
  children,
  ...props
}: BentoButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-full aspect-square",
        className
      )}
      {...props}
       style={{
          background: "linear-gradient(180deg, var(--secondary) 0%, color-mix(in srgb, var(--secondary) 55%, #000) 100%)",
          backgroundBlendMode: "plus-lighter, normal",
          boxShadow:
            "0px 24px 60px color-mix(in srgb, var(--foreground) 18%, transparent), 0px 14px 20px color-mix(in srgb, var(--foreground) 10%, transparent), 0px 6px 9px color-mix(in srgb, var(--foreground) 12%, transparent), 0px 2px 4px color-mix(in srgb, var(--foreground) 8%, transparent), inset 0px 1px 18px 2px color-mix(in srgb, var(--foreground) 55%, transparent), inset 0px 1px 4px 2px color-mix(in srgb, var(--foreground) 75%, transparent)",
        }}
    >

        {children || "Bento"}
    </button>
  );
}
