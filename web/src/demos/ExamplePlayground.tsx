import { useState } from "react";

/**
 * Template demo: duplicate this file, tweak the UI, then register it in `registry.ts`.
 * Live URL: `/demo/<id>` (this one is `/demo/example`).
 */
export default function ExamplePlayground() {
  const [n, setN] = useState(0);

  return (
    <div className="demo-panel">
      <p className="demo-lead">
        This is the starter playground. Replace this component or add new files under{" "}
        <code>src/demos/</code> and list them in <code>registry.ts</code>.
      </p>
      <div className="demo-row">
        <button type="button" onClick={() => setN((c) => c - 1)}>
          −
        </button>
        <span className="demo-count">{n}</span>
        <button type="button" onClick={() => setN((c) => c + 1)}>
          +
        </button>
      </div>
    </div>
  );
}

