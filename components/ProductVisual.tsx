import Photo from "@/components/Photo";
import type { ProductRange } from "@/lib/content/types";

const INCH = 13; // px per inch — every plate is drawn to the same scale

function Rings({ inches }: { inches: number[] }) {
  const max = Math.max(...inches);
  const angles = [-150, -90, -30, 30];
  return (
    <>
      {inches.map((d, i) => {
        const r = (d * INCH) / 2;
        const a = (angles[i % angles.length] * Math.PI) / 180;
        return (
          <g key={d}>
            <circle cx="150" cy="96" r={r} />
            <text
              x={150 + (r - 9) * Math.cos(a)}
              y={96 + (r - 9) * Math.sin(a) + 3}
              textAnchor="middle"
              className="plate-label"
            >
              {d}&quot;
            </text>
          </g>
        );
      })}
      <path d={`M${150 - (max * INCH) / 2} 182h${max * INCH}`} strokeDasharray="2 4" />
      <text x="150" y="195" textAnchor="middle" className="plate-label">
        {max} inch
      </text>
    </>
  );
}

function Plate({ slug }: { slug: string }) {
  switch (slug) {
    case "traditional-pizza-bases":
      return <Rings inches={[6, 9, 12]} />;
    case "gluten-free":
      return <Rings inches={[9, 11]} />;
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
    case "dinobite-kids":
      return (
        <>
          <path d="M52 132c2-22 22-36 50-38 10-30 24-50 44-52 16-1 22 12 12 18-12 2-20 14-24 34 34 0 62 10 84 30 12 6 24 4 32-4-4 18-24 26-44 20v22h-16l-2-16h-74l-2 16H96l-2-18c-22 2-38-2-42-12z" />
          <circle cx="150" cy="54" r="2" fill="currentColor" />
          <path d="M60 178h54" strokeDasharray="2 4" />
          <text x="87" y="194" textAnchor="middle" className="plate-label">
            6 inch
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
  if (product.image) {
    return (
      <Photo
        src={product.image}
        alt={product.imageAlt ?? product.name}
        ratio="3/2"
        grade={product.slug === "square-pizza-base" ? "baked" : "dough"}
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
        className="plate h-full w-full text-flour"
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
