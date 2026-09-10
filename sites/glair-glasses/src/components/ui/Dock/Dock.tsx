const HEADER_ICONS = [
  { src: "/assets/Glasses.svg", alt: "Glasses" },
  { src: "/assets/Star.svg", alt: "Favorites" },
  { src: "/assets/Pencil.svg", alt: "Annotate" },
  { src: "/assets/Figure.svg", alt: "Modes" },
  { src: "/assets/List.svg", alt: "Notes" },
];

export function Dock() {
  return (
    <nav
      className="mx-auto flex shrink-0 items-center gap-7 rounded-full bg-white/5 px-6 py-3 backdrop-blur-[6px]"
      style={{ WebkitBackdropFilter: "blur(6px)" }}
    >
      <div className="flex items-center gap-1.5">
        <img src="/assets/logo.svg" alt="GLAIR" className="h-[18px] w-auto" />
      </div>
      {HEADER_ICONS.map((icon) => (
        <img key={icon.src} src={icon.src} alt={icon.alt} className="h-5 w-auto opacity-90" />
      ))}
      <button className="relative flex h-[34px] w-[120px] items-center justify-center gap-1.5 text-[7px] font-medium text-[#111111] lg:text-[10px]">
        <img
          src="/assets/BGButtonPreOrder.svg"
          alt=""
          className="absolute inset-0 h-full w-full"
        />
        <span className="relative whitespace-nowrap">PRE-ORDER</span>
        <img src="/assets/ArrowRight.svg" alt="" className="relative h-[7.6px] w-auto" />
      </button>
    </nav>
  );
}
