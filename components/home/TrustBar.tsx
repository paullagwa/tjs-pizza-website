import { Award, Flag, Leaf, Snowflake, Truck, Clock } from "lucide-react";
import { business } from "@/lib/content/business";

export default function TrustBar() {
  const items = [
    { icon: Award, label: "HACCP Certified" },
    { icon: Flag, label: "100% Australian Owned" },
    { icon: Clock, label: `Since ${business.foundedYear}` },
    { icon: Snowflake, label: "Chilled & Frozen" },
    { icon: Truck, label: "National Delivery" },
    { icon: Leaf, label: "Zero Preservatives" },
  ];

  return (
    <div className="border-y border-line bg-bg2">
      <ul className="container-site flex flex-wrap items-center gap-x-8 gap-y-3 py-4">
        {items.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-warm/70"
          >
            <Icon aria-hidden="true" className="h-3.5 w-3.5 text-green" />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
