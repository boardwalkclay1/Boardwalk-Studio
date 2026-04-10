function CapabilitiesPanel() {
  const items = [
    {
      title: "Autonomous Builder",
      desc: "Generates full-stack apps (backend, frontend, DB, Cloudflare config, deploy notes) from a single goal and stack choice.",
    },
    {
      title: "AI App Stubs",
      desc: "Prepares backend routes for AI features (music, video, image-to-comic, image-to-video).",
    },
    {
      title: "File Explorer & Editor",
      desc: "Browse, open, edit, and save any file in the project directly from the Studio UI.",
    },
    {
      title: "Backend & Frontend Runner",
      desc: "Start dev servers (npm run dev) for backend and frontend from the UI.",
    },
    {
      title: "Cloudflare Worker Deploy",
      desc: "Deploy the generated Worker (with KV, D1, R2, Queues, Cron bindings) using wrangler.",
    },
    {
      title: "Cloudflare Pages Ready",
      desc: "Project structure and configs are designed to be hosted on Cloudflare Pages.",
    },
    {
      title: "D1 / R2 / KV / Queues",
      desc: "Config stubs and bindings are generated so you can create and wire Cloudflare resources.",
    },
    {
      title: "GitHub Integration",
      desc: "Clone any GitHub repo into a project and then edit, run, and deploy it.",
    },
    {
      title: "Error Diagnostics",
      desc: "Paste error logs, capture them into diagnostics files, and track them per project.",
    },
    {
      title: "Themes & Layout",
      desc: "Gold/Black, Red/Black, and White-Space themes with a cinematic IDE layout.",
    },
    {
      title: "Plugin System",
      desc: "Extend the Studio with new tools, panels, and integrations.",
    },
    {
      title: "Online Upgrade Layer",
      desc: "Optional cloud-only features that sit on top of the offline core.",
    },
  ];

  return (
    <section className="studio-panel" style={{ margin: 10 }}>
      <div className="studio-panel-header">
        <h2>Capabilities · Definitions</h2>
        <span>What this Studio can do</span>
      </div>

      <div className="studio-panel-body">
        {items.map((item, idx) => (
          <div key={idx} style={{ marginBottom: 10 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {item.title}
            </div>
            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
              {item.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// IMPORTANT: expose globally for UMD React
window.CapabilitiesPanel = CapabilitiesPanel;
