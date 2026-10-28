import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="grain relative grid min-h-[100svh] place-items-center overflow-hidden bg-ink px-4 text-center text-white">
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sunset/20 blur-[140px]" />
      <div className="relative">
        <p className="font-display text-[9rem] font-black leading-none sm:text-[14rem]">
          4<span className="text-gradient italic">0</span>4
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Looks like you drifted off course</h1>
        <p className="mx-auto mt-4 max-w-md text-white/60">The page you&apos;re looking for has flown away. Let&apos;s get you back to the launch site.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" icon="arrow-right">Back to Home</Button>
          <Button href="/packages/" variant="ghost-light">See Packages</Button>
        </div>
      </div>
    </section>
  );
}
