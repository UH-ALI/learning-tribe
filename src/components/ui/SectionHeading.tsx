interface SectionHeadingProps {
  /** Small eyebrow line above the title, e.g. "Meet Our Teachers". */
  eyebrow: string;
  /** Wrap the key phrase in <Accent> to set it in gold italic serif. */
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Set when the section sits on a navy background. */
  onDark?: boolean;
  align?: "center" | "left";
}

/** Gold serif-italic emphasis for the key phrase of a section title. */
export function Accent({
  children,
  onDark = false,
}: {
  children: React.ReactNode;
  onDark?: boolean;
}) {
  return (
    <span
      className={`font-serif font-normal italic tracking-normal ${
        onDark ? "text-gold" : "text-gold-dark"
      }`}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  onDark = false,
  align = "center",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p
        className={`eyebrow ${onDark ? "text-gold" : "text-gold-deep"} ${
          centered ? "justify-center" : ""
        }`}
      >
        <span aria-hidden className="h-px w-8 bg-current opacity-60" />
        {eyebrow}
        {centered && <span aria-hidden className="h-px w-8 bg-current opacity-60" />}
      </p>
      <h2
        className={`mt-4 font-display text-[2.1rem] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl ${
          onDark ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 text-base leading-relaxed sm:text-lg ${
            onDark ? "text-slate-300" : "text-slate-600"
          } ${centered ? "mx-auto max-w-xl" : "max-w-xl"}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
