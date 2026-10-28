import type { SiteData } from "./types";

export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

export async function fetchSite(): Promise<SiteData | null> {
  if (!API_URL) return null;
  try {
    const res = await fetch(`${API_URL}/site`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as SiteData;
  } catch {
    return null;
  }
}

export type EnquiryInput = {
  name: string;
  email?: string;
  phone: string;
  message: string;
  source: string;
};

export type BookingInput = {
  packageId: number | null;
  date: string;
  persons: number;
  name: string;
  email?: string;
  phone: string;
  notes?: string;
  addStay?: boolean;
  /** Present when the booking comes from the trip builder. */
  stay?: { stayId: number; nights: number; units: number } | null;
  extras?: { extraId: number; qty: number }[];
  quotedTotal?: number;
};

/** Returns true when the API accepted the submission, false when there is no API (caller falls back to WhatsApp). */
async function post(path: string, body: unknown): Promise<boolean> {
  if (!API_URL) return false;
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Something went wrong. Please try again.");
  }
  return true;
}

export const submitEnquiry = (data: EnquiryInput) => post("/enquiries", data);
export const submitBooking = (data: BookingInput) => post("/bookings", data);
