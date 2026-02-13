import type { PropertyInvestment } from "@/types/property";

type ROISnapshotProps = {
  investment: PropertyInvestment;
};

export function ROISnapshot({ investment }: ROISnapshotProps) {
  const yearlyGrossUsd = Math.round(investment.dailyRateUsd * 365);

  return (
    <section className="space-y-4">
      <h2 className="font-heading text-2xl text-brand-emerald">ROI Snapshot</h2>
      <article className="glass-panel rounded-2xl border-brand-emerald/15 p-5">
        <dl className="grid gap-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-xs uppercase tracking-[0.12em] text-brand-emerald/70">Daily Rate</dt>
            <dd className="mt-1 text-xl font-semibold text-brand-emerald">
              ${investment.dailyRateUsd.toLocaleString("en-US")}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.12em] text-brand-emerald/70">Yield</dt>
            <dd className="mt-1 text-xl font-semibold text-brand-emerald">
              {investment.yieldPercent.toFixed(1)}%
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.12em] text-brand-emerald/70">
              Gross Annual (USD)
            </dt>
            <dd className="mt-1 text-xl font-semibold text-brand-emerald">
              ${yearlyGrossUsd.toLocaleString("en-US")}
            </dd>
          </div>
        </dl>
      </article>
    </section>
  );
}
