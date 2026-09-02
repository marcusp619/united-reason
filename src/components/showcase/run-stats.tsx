"use client";

import { motion } from "motion/react";

import { CountUp } from "@/components/count-up";
import type { RunStat } from "@/types/showcase";

const EASE_OUT = [0.2, 0, 0, 1] as const;

function Stat({ stat }: { stat: RunStat }) {
  return (
    <div className="flex-1 px-4.5 py-4">
      <p className="m-0 text-[30px] leading-none tracking-[-0.03em] md:text-[38px]">
        <CountUp to={stat.value} unit={stat.unit} />
      </p>
      <p className="text-muted m-0 mt-2 text-[11px] tracking-[0.16em] uppercase">{stat.label}</p>
    </div>
  );
}

/** The figures, once a run has finished. Illustrative, and labelled as such. */
export function RunStats({ stats, note }: { stats: readonly RunStat[]; note: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE_OUT }}
      className="border-2 border-[var(--color-divider)]"
    >
      <div className="flex flex-wrap divide-x-2 divide-[var(--color-divider)]">
        {stats.map((stat) => (
          <Stat key={stat.label} stat={stat} />
        ))}
      </div>
      <p className="m-0 border-t-2 border-[var(--color-divider)] px-4.5 py-3.5 text-[13px] leading-[1.5]">
        {note}
      </p>
    </motion.div>
  );
}
