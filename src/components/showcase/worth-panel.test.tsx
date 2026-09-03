import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import type { WorthInputs } from "@/lib/flow-worth";

import { flows } from "@/content/flows";
import { BuildKind } from "@/content/pricing";
import { defaultWorthInputs } from "@/lib/flow-worth";
import { WorthPanel } from "./worth-panel";

const workflow = flows[0];
const weeklyReport = flows[3];
const site = flows[4];

function renderPanel(flow = workflow) {
  const onChange = vi.fn();
  render(<WorthPanel flow={flow} inputs={defaultWorthInputs(flow)} onChange={onChange} />);
  return { onChange };
}

/** The fields are controlled, so typing into them needs somewhere to type to. */
function Harness({
  flow,
  onChange,
}: {
  flow: typeof workflow;
  onChange: (i: WorthInputs) => void;
}) {
  const [inputs, setInputs] = useState(defaultWorthInputs(flow));
  return (
    <WorthPanel
      flow={flow}
      inputs={inputs}
      onChange={(next) => {
        setInputs(next);
        onChange(next);
      }}
    />
  );
}

describe("the worth panel", () => {
  it("states the money and the wait", () => {
    renderPanel();

    expect(screen.getByText("$90")).toBeInTheDocument();
    expect(screen.getByText("$4,500")).toBeInTheDocument();
    expect(screen.getByText("7 months")).toBeInTheDocument();
  });

  it("tells you not to build the one that doesn't pay back", () => {
    expect(weeklyReport.build).toBe(BuildKind.Workflow);
    renderPanel(weeklyReport);

    expect(screen.getByText(/I'd leave this one/)).toBeInTheDocument();
    // Stated as a figure and repeated in the sentence — both are the point.
    expect(screen.getAllByText(/2\.1 years/)).toHaveLength(2);
  });

  it("declines to put a payback on a site", () => {
    renderPanel(site);

    expect(screen.getByText("To pay for itself").previousSibling).toHaveTextContent("—");
    expect(screen.getByText(/the work you win with it/)).toBeInTheDocument();
  });

  it("recomputes the money from a rate the reader types", async () => {
    const onChange = vi.fn();
    render(<Harness flow={workflow} onChange={onChange} />);
    const field = screen.getByLabelText(/What an hour of that person costs you/);

    await userEvent.clear(field);
    await userEvent.type(field, "45");

    expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ hourlyCost: 45 }));
    // 3 hrs a week at $45, and the payback shortens with it.
    expect(screen.getByText("$135")).toBeInTheDocument();
    expect(screen.getByText("5 months")).toBeInTheDocument();
  });

  it("keeps the reader's own arithmetic reproducible", () => {
    // $60 a week is 2 hrs at $30 — the two figures directly above it.
    renderPanel(flows[2]);
    expect(screen.getByText("$60")).toBeInTheDocument();
  });
});
