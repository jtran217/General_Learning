import type { DemoEntry } from "@/demos/types";
import ExamplePlayground from "@/demos/ExamplePlayground";
import TimerDemo from "@/demos/TimerDemo";

/**
 * Add a row here when you create a new demo component.
 * The shell renders a sidebar from this list. Each demo is at `/demo/<id>`.
 */
export const demos: DemoEntry[] = [
  {
    id: "example",
    title: "Example",
    description: "Starter demo — copy this pattern for new UI experiments.",
    Component: ExamplePlayground,
  },
  {
    id: "timer",
    title: "Timer Component",
    description: "Implementation of a timer",
    Component: TimerDemo,
  },
];

export function getDefaultDemoId(): string | null {
  return demos[0]?.id ?? null;
}
