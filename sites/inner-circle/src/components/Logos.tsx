// The source spec's marquee displayed real third-party company logos
// (Google, GitHub, and several other real products) as if "Inner Circle"
// integrated with or was endorsed by them — that's a false-partnership
// implication for a page that has no real relationship with any of them.
// Replaced with a set of invented wordmarks so the marquee still reads as
// a "trusted by / built with" strip without naming real companies.

function Wordmark({ label, weight = 700 }: { label: string; weight?: number }) {
  return (
    <span
      className="text-[20px] tracking-tight text-white/80 hover:text-white transition-opacity select-none"
      style={{ fontFamily: "var(--font-michroma)", fontWeight: weight }}
    >
      {label}
    </span>
  );
}

export function NovaWordmark() {
  return <Wordmark label="NOVA" />;
}
export function OrbitWordmark() {
  return <Wordmark label="ORBIT" />;
}
export function FluxWordmark() {
  return <Wordmark label="FLUX" />;
}
export function VertexWordmark() {
  return <Wordmark label="VERTEX" />;
}
export function PrismWordmark() {
  return <Wordmark label="PRISM" />;
}
export function EchoWordmark() {
  return <Wordmark label="ECHO" />;
}
export function DriftWordmark() {
  return <Wordmark label="DRIFT" />;
}
