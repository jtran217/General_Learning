import { useEffect, useMemo } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { demos, getDefaultDemoId } from "@/demos/registry";

export function App() {
  const { demoId } = useParams();
  const navigate = useNavigate();

  const active = useMemo(() => demos.find((d) => d.id === demoId), [demoId]);

  useEffect(() => {
    if (!demoId || !demos.length) return;
    if (!active) {
      const fallback = getDefaultDemoId();
      if (fallback) {
        navigate(`/demo/${fallback}`, { replace: true });
      }
    }
  }, [active, demoId, navigate]);

  if (!demos.length) {
    return (
      <div className="shell">
        <p className="empty-state">No demos registered yet. Add one in `src/demos/registry.ts`.</p>
      </div>
    );
  }

  if (!active) {
    return null;
  }

  const { Component } = active;

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <strong>Lab</strong>
          <span className="brand-sub">General Learning</span>
        </div>
        <nav className="nav">
          {demos.map((d) => (
            <NavLink
              key={d.id}
              to={`/demo/${d.id}`}
              className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
            >
              <span className="nav-title">{d.title}</span>
              {d.description ? <span className="nav-desc">{d.description}</span> : null}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="main">
        <header className="main-header">
          <h1>{active.title}</h1>
          {active.description ? <p className="main-desc">{active.description}</p> : null}
        </header>
        <section className="main-body">
          <Component />
        </section>
      </main>
    </div>
  );
}
