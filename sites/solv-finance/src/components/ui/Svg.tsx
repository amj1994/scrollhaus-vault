interface SvgProps {
  /** Raw SVG (or SVG-cluster) markup, imported via `?raw`. */
  markup: string;
  className?: string;
  "aria-hidden"?: boolean;
}

/**
 * Renders raw SVG markup (imported as a string with Vite's `?raw`) inline.
 * Keeps the original vector files pristine instead of hand-converting them to JSX.
 */
export default function Svg({ markup, className, ...rest }: SvgProps) {
  return (
    <span
      className={className}
      // The SVG strings are our own static, trusted design assets.
      dangerouslySetInnerHTML={{ __html: markup }}
      {...rest}
    />
  );
}
