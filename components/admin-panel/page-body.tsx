"use client";

import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PageBodyProps {
  children: ReactNode;
  className?: string;
}

export function PageBody({ children, className }: PageBodyProps) {
  return <div className={cn("p-6", className)}>{children}</div>;
}
