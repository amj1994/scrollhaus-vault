import { A } from "@/lib/assets";

const SATOSHI = "'Satoshi', system-ui, sans-serif";
const INTER_TIGHT = "'Inter Tight', sans-serif";
const PLAYFAIR = "'Playfair Display', serif";

const BRANDS: { name: string; icon: string | null }[] = [
  { name: "Nueral", icon: A.Nueral },
  { name: "GroundAI", icon: null },
  { name: "Wids", icon: A.Wids },
  { name: "Orinya", icon: A.Orinya },
  { name: "Xyreion", icon: A.Xyreion },
  { name: "Skodia", icon: A.Skodia },
  { name: "GreenFlag", icon: A.GreenFlag },
];

export default function TrustedBy() {
  const row = [...BRANDS, ...BRANDS];

  return (
    <section className="bg-white pt-16 pb-14 px-[40px]">
      <h2
        className="text-center text-3xl md:text-4xl font-medium text-neutral-900 mb-12"
        style={{ fontFamily: INTER_TIGHT }}
      >
        Trusted by the{" "}
        <em style={{ fontFamily: PLAYFAIR, fontStyle: "italic" }}>leading brands</em>
      </h2>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex w-max animate-marquee gap-16">
          {row.map((b, i) => (
            <div key={i} className="flex items-center gap-3 shrink-0 opacity-40">
              {b.icon && <img src={b.icon} alt="" className="h-8 w-auto" />}
              <span
                className="text-3xl font-bold text-black whitespace-nowrap"
                style={{ fontFamily: SATOSHI }}
              >
                {b.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
