"use client";

import { useSite } from "@/components/providers/SiteProvider";
import { Icon } from "@/components/ui/Icon";
import { Counter, Reveal } from "@/components/ui/Motion";

export function PilotStats() {
  const { pilots } = useSite();
  const online = pilots.filter((p) => p.status === "online").length;
  const years = pilots.reduce((s, p) => s + p.experience, 0);
  const stats = [
    { icon: "users", value: pilots.length, suffix: "", label: "Expert pilots" },
    { icon: "check", value: online, suffix: "", label: "Available now" },
    { icon: "award", value: years, suffix: "+", label: "Combined years" },
    { icon: "shield", value: 100, suffix: "%", label: "Certified" },
  ];
  return (
    <section className="relative z-10 -mt-12">
      <div className="container-x">
        <Reveal>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] bg-ink/10 shadow-2xl shadow-ink/10 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-4 bg-white p-5 sm:p-7">
                <span className="hidden size-12 place-items-center rounded-2xl bg-sunset/10 text-sunset sm:grid">
                  <Icon name={s.icon} className="size-6" />
                </span>
                <div>
                  <Counter to={s.value} suffix={s.suffix} className="font-display text-3xl font-black sm:text-4xl" />
                  <p className="text-xs text-muted sm:text-sm">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
