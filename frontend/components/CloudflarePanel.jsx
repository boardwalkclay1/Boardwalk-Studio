function CloudflarePanel({ project, API_BASE }) {
  const [logs, setLogs] = React.useState([]);
  const [workerLogs, setWorkerLogs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  function push(msg) {
    setLogs((prev) => [...prev, msg]);
  }

  function pushWorker(msg) {
    setWorkerLogs((prev) => [...prev, msg]);
  }

  async function call(endpoint, label) {
    setLoading(true);
    push(`→ ${label}…`);

    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ project }),
    });

    const data = await res.json();

    if (data.events) {
      data.events.forEach((e) => push(`[${e.kind}] ${e.message}`));
    } else if (data.message) {
      push(data.message);
    }

    setLoading(false);
  }

  async function loadWorkerLogs() {
    const res = await fetch(
      `${API_BASE}/api/cloudflare/worker_logs?project=${project}&limit=50`
    );
    const data = await res.json();
    setWorkerLogs(data.logs || []);
  }

  return (
    <section className="studio-panel" style={{ marginTop: 10 }}>
      <div className="studio-panel-header">
        <h2>Cloudflare</h2>
        <span>{project}</span>
      </div>

      <div className="studio-panel-body">
        {/* DEPLOY WORKER */}
        <button
          className="btn btn-primary"
          onClick={() => call("/api/cloudflare/deploy_worker", "Deploy Worker")}
          disabled={loading}
        >
          Deploy Worker
        </button>

        {/* PAGES DEPLOY */}
        <button
          className="btn btn-primary"
          style={{ marginTop: 6 }}
          onClick={() => call("/api/cloudflare/deploy_pages", "Deploy Pages")}
          disabled={loading}
        >
          Deploy Pages
        </button>

        {/* RESOURCE CREATION */}
        <button
          className="btn btn-ghost"
          style={{ marginTop: 10 }}
          onClick={() => call("/api/cloudflare/create_d1", "Create D1")}
          disabled={loading}
        >
          Create D1
        </button>

        <button
          className="btn btn-ghost"
          onClick={() => call("/api/cloudflare/create_r2", "Create R2")}
          disabled={loading}
        >
          Create R2
        </button>

        <button
          className="btn btn-ghost"
          onClick={() => call("/api/cloudflare/create_kv", "Create KV")}
          disabled={loading}
        >
          Create KV
        </button>

        <button
          className="btn btn-ghost"
          onClick={() => call("/api/cloudflare/create_queue", "Create Queue")}
          disabled={loading}
        >
          Create Queue
        </button>

        {/* WORKER LOGS */}
        <button
          className="btn btn-primary"
          style={{ marginTop: 10 }}
          onClick={loadWorkerLogs}
        >
          Load Worker Logs
        </button>

        <div className="log-panel" style={{ marginTop: 10 }}>
          <div className="field-label">Worker Logs</div>
          {workerLogs.map((l, i) => (
            <div key={i} className="event-line">
              [{l.level}] {l.message}
            </div>
          ))}
        </div>

        {/* ACTION LOGS */}
        <div className="log-panel" style={{ marginTop: 10 }}>
          <div className="field-label">Cloudflare Actions</div>
          {logs.map((l, i) => (
            <div key={i} className="event-line">
              {l}
            </div>
          ))}
        </div>

        {/* ONLINE UPGRADE PANEL */}
        <div
          style={{
            marginTop: 12,
            padding: 10,
            borderRadius: 10,
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
            Online Upgrades
          </div>

          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
            This panel is reserved for cloud‑only enhancements such as:
            <ul style={{ marginTop: 4 }}>
              <li>Remote AI model providers</li>
              <li>Cloudflare analytics</li>
              <li>Hosted logs</li>
              <li>Remote plugin registry</li>
            </ul>
            These features activate only if you add API keys.
          </div>
        </div>
      </div>
    </section>
  );
}

// IMPORTANT: expose globally for UMD React
window.CloudflarePanel = CloudflarePanel;
