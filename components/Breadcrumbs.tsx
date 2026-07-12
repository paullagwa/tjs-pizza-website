import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { breadcrumbGraph } from "@/lib/seo";

export default function Breadcrumbs({
  items,
}: {
  items: Array<{ name: string; path: string }>;
}) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
      <JsonLd data={breadcrumbGraph(items)} />
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-warm/65">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {i > 0 && (
                <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 text-muted" />
              )}
              {last ? (
                <span aria-current="page" className="text-warm/85">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="hover:text-warm">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
