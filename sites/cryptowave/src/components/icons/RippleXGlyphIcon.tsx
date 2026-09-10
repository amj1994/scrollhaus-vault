interface IconProps {
  size?: number;
  className?: string;
}

export function RippleXGlyphIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="10.5 10.1 24.4 24.4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M30.9956 32.4675L26.6818 25.9376H32.8767V23.4708H12.5615V25.9376H18.7564L14.4426 32.4675H17.6528L22.7191 24.801L27.7853 32.4675H30.9956ZM32.8767 21.0765V18.6097H26.8072L31.0709 12.1524H27.8355L22.7191 19.9398L17.6027 12.1524H14.3673L18.631 18.6097H12.5615V21.1007L32.8767 21.0765Z"
        fill="white"
      />
    </svg>
  );
}
