function PluginSlots({ plugins }) {
  if (!plugins || plugins.length === 0) {
    return (
      <section className="studio-panel" style={{ marginTop: 10 }}>
        <div className="studio-panel-header">
          <h2>Plugins</h2>
          <span>0 loaded</span>
        </div>

        <div className="studio-panel-body">
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
            No plugins registered.
            Plugins can add panels, tools, analyzers, AI integrations, or UI
            extensions without modifying the core Studio.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="studio-panel" style={{ marginTop: 10 }}>
      <div className="studio-panel-header">
        <h2>Plugins</h2>
        <span>{plugins.length} loaded</span>
      </div>

      <div className="studio-panel-body">
        {plugins.map((p, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: 10,
              padding: 8,
              borderRadius: 8,
              border: "1px solid var(--border-subtle)",
              background: "rgba(0,0,0,0.25)",
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              {p.name}
            </div>

            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
              Type: {p.kind}
            </div>

            {p.config && (
              <div style={{ fontSize: 11, marginTop: 4 }}>
                <strong>Config:</strong>
                <pre
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    padding: 6,
                    borderRadius: 6,
                    overflowX: "auto",
                    fontSize: 10,
                  }}
                >
{JSON.stringify(p.config, null, 2)}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// IMPORTANT: expose globally for UMD React
window.PluginSlots = PluginSlots;
