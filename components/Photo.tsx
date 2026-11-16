import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  /** Only two ratios are allowed site-wide. */
  ratio?: "4/5" | "3/2";
  /** dough = warm near-monochrome (raw dough, hands). baked = tamed colour. none = as shot (packaging). */
  grade?: "dough" | "baked" | "none";
  /** Darkened corners — for phone shots with busy edges. */
  vignette?: boolean;
  sizes: string;
  priority?: boolean;
  /** CSS object-position, e.g. "50% 30%" */
  position?: string;
  /** Documentary caption, set in mono under the frame. */
  caption?: string;
  className?: string;
};

/** Every photograph on the site goes through here: one ratio system, one grade. */
export default function Photo({
  src,
  alt,
  ratio = "3/2",
  grade = "dough",
  vignette = false,
  sizes,
  priority,
  position,
  caption,
  className = "",
}: Props) {
  const frame = (
    <div
      className={`photo photo-${grade} ${vignette ? "photo-vignette" : ""} ${
        ratio === "4/5" ? "aspect-[4/5]" : "aspect-[3/2]"
      } ${caption ? "" : className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        style={position ? { objectPosition: position } : undefined}
      />
    </div>
  );
  if (!caption) return frame;
  return (
    <figure className={className}>
      {frame}
      <figcaption className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}
