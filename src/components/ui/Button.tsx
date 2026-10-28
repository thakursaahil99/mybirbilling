import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

type Variant = "primary" | "dark" | "light" | "outline" | "ghost-light" | "whatsapp";

const styles: Record<Variant, string> = {
  primary: "bg-sunset text-white hover:bg-ember shadow-[0_12px_30px_-10px_rgba(242,118,46,0.8)]",
  dark: "bg-ink text-white hover:bg-navy",
  light: "bg-white text-ink hover:bg-cream",
  outline: "border border-ink/15 text-ink hover:border-ink hover:bg-ink hover:text-white",
  "ghost-light": "border border-white/30 text-white hover:bg-white hover:text-ink backdrop-blur-md",
  whatsapp: "bg-[#25D366] text-white hover:bg-[#1eb457]",
};

type Props = {
  href?: string;
  variant?: Variant;
  icon?: string;
  iconLeft?: string;
  size?: "md" | "lg" | "sm";
  className?: string;
  children: React.ReactNode;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({
  href,
  variant = "primary",
  icon,
  iconLeft,
  size = "md",
  className,
  children,
  external,
  type = "button",
  disabled,
  onClick,
}: Props) {
  const cls = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold transition-all duration-300 active:scale-[0.97] disabled:opacity-60 disabled:pointer-events-none",
    size === "lg" && "px-7 py-4 text-[15px]",
    size === "md" && "px-6 py-3 text-sm",
    size === "sm" && "px-4 py-2 text-xs",
    styles[variant],
    className,
  );
  const inner = (
    <>
      {iconLeft && <Icon name={iconLeft} className="size-[1.1em]" />}
      <span>{children}</span>
      {icon && (
        <Icon name={icon} className="size-[1.1em] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px" />
      )}
    </>
  );

  if (href) {
    const isExternal = external ?? /^(https?:|tel:|mailto:)/.test(href);
    if (isExternal) {
      return (
        <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} disabled={disabled} onClick={onClick}>
      {inner}
    </button>
  );
}
