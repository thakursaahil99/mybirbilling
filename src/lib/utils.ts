export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const MEDIA_BASE = process.env.NEXT_PUBLIC_MEDIA_URL ?? "";

/** Resolve a stored media path (e.g. /uploads/media/x.mp4) to a URL. */
export function media(path: string) {
  if (!path || /^https?:\/\//.test(path)) return path;
  return MEDIA_BASE + path;
}

export function inr(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

export function waLink(number: string, text?: string) {
  return `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

export function telLink(phone: string) {
  return "tel:" + phone.replace(/[^\d+]/g, "");
}
