import type { PropertyDistances } from "@/types/property";

type PrivacyListProps = {
  distances: PropertyDistances;
};

export function PrivacyList({ distances }: PrivacyListProps) {
  const entries = [
    `✈️ Airport: ${distances.airportMins} mins`,
    `🏝️ Beach: ${distances.beachMins} mins`,
    `🏥 Hospital: ${distances.hospitalMins} mins`,
  ];

  return (
    <section className="space-y-4">
      <h2 className="font-heading text-2xl text-brand-emerald">Privacy List</h2>
      <ul className="space-y-2">
        {entries.map((entry) => (
          <li
            key={entry}
            className="glass-panel rounded-xl border-brand-emerald/15 px-4 py-3 text-sm text-brand-emerald"
          >
            {entry}
          </li>
        ))}
      </ul>
    </section>
  );
}
