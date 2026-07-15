interface SectionHeadingProps {
  /** Small gold eyebrow line above the title, e.g. "Meet Our Teachers". */
  eyebrow: string;
  title: string;
  description?: string;
  /** Set when the section sits on a navy background. */
  onDark?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  onDark = false,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-gold-dark">
        {eyebrow}
      </p>
      <h2
        className={`mt-2 font-display text-3xl font-extrabold sm:text-4xl ${
          onDark ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold" aria-hidden />
      {description ? (
        <p className={`mt-4 text-base ${onDark ? "text-slate-300" : "text-slate-600"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
