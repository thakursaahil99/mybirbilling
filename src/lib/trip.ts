import type { Extra, Package, Stay } from "./types";

export type TripState = {
  packageId: number | null;
  travellers: number;
  stayId: number | null;
  nights: number;
  /** Rooms for room-priced stays; beds follow travellers for per-person stays. */
  rooms: number;
  mealsPerDay: number;
  scootyDays: number;
};

export type Line = { label: string; detail: string; amount: number };

export function roomsNeeded(stay: Stay, travellers: number) {
  return stay.pricing === "person" ? travellers : Math.max(1, Math.ceil(travellers / stay.capacity));
}

/** Pure price calculation shared by the trip builder UI and the booking payload. */
export function quoteTrip(state: TripState, pkg: Package | undefined, stay: Stay | undefined, extras: Extra[], comboPct: number) {
  const lines: Line[] = [];
  if (pkg) {
    lines.push({ label: pkg.title, detail: `${state.travellers} × ₹${pkg.price.toLocaleString("en-IN")}`, amount: pkg.price * state.travellers });
  }
  if (stay && state.nights > 0) {
    const units = stay.pricing === "person" ? state.travellers : state.rooms;
    lines.push({
      label: stay.title,
      detail: `${units} ${stay.pricing === "person" ? (units > 1 ? "beds" : "bed") : units > 1 ? "rooms" : "room"} × ${state.nights} night${state.nights > 1 ? "s" : ""}`,
      amount: stay.price * units * state.nights,
    });
  }
  const meal = extras.find((e) => e.unit === "meal");
  const days = Math.max(1, state.nights);
  if (meal && state.mealsPerDay > 0) {
    const qty = state.mealsPerDay * days * state.travellers;
    lines.push({ label: meal.title, detail: `${qty} meals (${state.mealsPerDay}/day × ${days}d × ${state.travellers})`, amount: meal.price * qty });
  }
  const scooty = extras.find((e) => e.unit === "day");
  if (scooty && state.scootyDays > 0) {
    lines.push({ label: scooty.title, detail: `${state.scootyDays} day${state.scootyDays > 1 ? "s" : ""}`, amount: scooty.price * state.scootyDays });
  }
  const subtotal = lines.reduce((s, l) => s + l.amount, 0);
  const comboApplies = !!pkg && !!stay && state.nights > 0;
  const discount = comboApplies ? Math.round((subtotal * comboPct) / 100) : 0;
  return { lines, subtotal, discount, total: subtotal - discount, comboApplies };
}
