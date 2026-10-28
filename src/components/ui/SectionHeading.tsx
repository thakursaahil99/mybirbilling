import { cn } from "@/lib/utils";
import { Reveal, SplitText } from "./Motion";

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
  dark,
  className,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "center" | "left";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left", className)}>
      {eyebrow && (
        <Reveal y={16}>
          <span className="eyebrow">
            <span className="h-px w-6 bg-current" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <h2
        className={cn(
          "mt-4 text-4xl font-extrabold leading-[1.02] sm:text-5xl lg:text-6xl",
          dark ? "text-white" : "text-ink",
        )}
      >
        <SplitText text={title} />
        {highlight && (
          <>
            {" "}
            <SplitText text={highlight} delay={0.15} wordClassName="text-gradient italic font-black pr-1" />
          </>
        )}
      </h2>
      {subtitle && (
        <Reveal delay={0.2} y={20}>
          <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", dark ? "text-white/70" : "text-muted")}>{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
