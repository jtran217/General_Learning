import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { App } from "@/App";
import { getDefaultDemoId } from "@/demos/registry";
import "./index.css";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Missing #root element");
}

function NoDemos() {
  return (
    <div className="shell">
      <p className="empty-state">No demos registered yet. Add one in `src/demos/registry.ts`.</p>
    </div>
  );
}

const defaultDemoId = getDefaultDemoId();

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            defaultDemoId ? (
              <Navigate to={`/demo/${defaultDemoId}`} replace />
            ) : (
              <NoDemos />
            )
          }
        />
        <Route path="/demo/:demoId" element={<App />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
