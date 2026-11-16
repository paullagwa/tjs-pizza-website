import type { ReactNode } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";

/** Shared opening for every inner page: breadcrumb, eyebrow, title, lead. */
export default function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  children,
}: {
  crumbs: Array<{ name: string; path: string }>;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="glow-top border-b border-line pb-14">
      <Breadcrumbs items={crumbs} />
      <div className="container-site pt-12">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="h-page mt-4 max-w-4xl">{title}</h1>
        {lead && <p className="lead mt-6 max-w-2xl text-warm/80">{lead}</p>}
        {children}
      </div>
    </header>
  );
}
