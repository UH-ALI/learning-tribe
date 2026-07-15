interface BadgeProps {
  children: React.ReactNode;
  /** "gold" = filled subject pill (Instagram style); "outline" = level chip. */
  variant?: "gold" | "outline";
}

export function Badge({ children, variant = "gold" }: BadgeProps) {
  const styles =
    variant === "gold"
      ? "bg-gold text-navy-dark"
      : "border border-navy/20 bg-white text-navy";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 font-display text-xs font-bold uppercase tracking-wide ${styles}`}
    >
      {children}
    </span>
  );
}
