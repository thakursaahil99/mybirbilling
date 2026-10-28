import { cn } from "@/lib/utils";

export function Marquee({
  children,
  className,
  duration = 40,
  reverse,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  reverse?: boolean;
}) {
  return (
    <div className={cn("group relative flex overflow-hidden", className)}>
      <div
        className="flex w-max shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]"
        style={{ ["--marquee-duration" as string]: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {children}
        <div aria-hidden="true" className="flex items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
