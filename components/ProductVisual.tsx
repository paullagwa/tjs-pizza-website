import Image from "next/image";
import Photo from "@/components/Photo";
import type { ProductRange } from "@/lib/content/types";

function Plate({ slug }: { slug: string }) {
  switch (slug) {
    case "square-pizza-base":
      return (
        <>
          <rect x="60" y="48" width="180" height="112" rx="3" />
          <path d="M120 48v112M180 48v112M60 104h180" strokeDasharray="4 5" />
          <text x="150" y="182" textAnchor="middle" className="plate-label">
            cut to any shape · up to half a metre
          </text>
        </>
      );
    case "garlic-butter-cheese":
      return (
        <>
          <circle cx="150" cy="96" r="58" />
          <circle cx="150" cy="96" r="48" strokeDasharray="1 6" />
          <path d="M122 84q8 8 0 18M150 74q8 10 0 22M176 88q8 8 0 18M136 116q10 6 22 0" />
          <text x="150" y="182" textAnchor="middle" className="plate-label">
            garlic · herb · bacon · bruschetta · mushroom
          </text>
        </>
      );
    default:
      return <circle cx="150" cy="100" r="60" />;
  }
}

/** A photo where an honest one exists; otherwise a to-scale line drawing. Never empty. */
export default function ProductVisual({
  product,
  sizes,
}: {
  product: ProductRange;
  sizes: string;
}) {
  if (product.image && product.imageCutout) {
    return (
      <div className="relative aspect-[3/2] bg-bg3">
        <Image
          src={product.image}
          alt={product.imageAlt ?? product.name}
          fill
          sizes={sizes}
          className="object-contain p-3 drop-shadow-[0_14px_18px_rgba(0,0,0,0.55)] transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  }
  if (product.image) {
    return (
      <Photo
        src={product.image}
        alt={product.imageAlt ?? product.name}
        ratio="3/2"
        grade={product.slug === "square-pizza-base" ? "baked" : "dough"}
        position={product.imagePosition}
        vignette={product.slug === "square-pizza-base"}
        sizes={sizes}
      />
    );
  }
  return (
    <div className="aspect-[3/2] bg-bg3">
      <svg
        viewBox="0 0 300 200"
        role="img"
        aria-label={`Line drawing of the ${product.name}, to scale`}
        className="plate h-full w-full text-warm"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Plate slug={product.slug} />
      </svg>
    </div>
  );
}
