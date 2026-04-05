import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "cyan" | "green" | "red" | "blue" | "purple";
}

export default function GlowCard({
  children,
  className,
  glowColor = "blue",
}: GlowCardProps) {
  const glowClass =
    glowColor === "purple"
      ? "hover:shadow-[0_0_20px_oklch(45%_0.22_290/0.3),0_0_40px_oklch(45%_0.22_290/0.12)] hover:border-[oklch(45%_0.22_290/0.5)]"
      : glowColor === "red"
        ? "hover:shadow-[0_0_20px_oklch(55%_0.2_25/0.3),0_0_40px_oklch(55%_0.2_25/0.12)] hover:border-[oklch(55%_0.2_25/0.5)]"
        : "hover:shadow-[0_0_20px_oklch(60%_0.25_230/0.3),0_0_40px_oklch(60%_0.25_230/0.12)] hover:border-[oklch(60%_0.25_230/0.5)]";

  return (
    <div
      className={cn(
        "glass-card glow-hover rounded-2xl transition-all duration-300",
        glowClass,
        className,
      )}
    >
      {children}
    </div>
  );
}
