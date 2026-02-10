import { Bolt, Droplets, Route, Wifi } from "lucide-react";
import type { PropertySpecs } from "@/types/property";

type SpecsGridProps = {
  specs: PropertySpecs;
};

export function SpecsGrid({ specs }: SpecsGridProps) {
  const items = [
    {
      label: "Power",
      value: specs.generator ? "Generator Backup Included" : "Grid Power Only",
      icon: Bolt,
    },
    {
      label: "Water",
      value: specs.waterSource,
      icon: Droplets,
    },
    {
      label: "Internet",
      value: specs.internetType,
      icon: Wifi,
    },
    {
      label: "Road Access",
      value: specs.roadAccess,
      icon: Route,
    },
  ];

  return (
    <section className="space-y-4">
      <h2 className="font-heading text-2xl text-brand-emerald">Asset Infrastructure</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.label}
              className="glass-panel rounded-2xl border-brand-emerald/15 p-4"
            >
              <p className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-brand-emerald/70">
                <Icon className="h-4 w-4" />
                {item.label}
              </p>
              <p className="text-sm font-medium text-brand-emerald">{item.value}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
