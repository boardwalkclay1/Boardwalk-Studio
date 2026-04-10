function RunDeployPanel({ project, API_BASE }) {
  const [logs, setLogs] = React.useState([]);
  const [deployLogs, setDeployLogs] = React.useState([]);
  const [githubUrl, setGithubUrl] = React.useState("");

  function pushLog(msg) {
    setLogs((prev) => [...prev, msg]);
  }

  function pushDeploy(msg) {
    setDeployLogs((prev) => [...prev, msg]);
  }

  async function runBackend() {
    await fetch(`${API_BASE}/api/run/backend`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ project }),
    });
    pushLog("Backend started.");
  }

  async function runFrontend() {
    await fetch(`${API_BASE}/api/run/frontend`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ project }),
    });
    pushLog("Frontend started.");
  }

  async function deployWorker() {
    const res = await fetch(`${API_BASE}/api/cloudflare/deploy_worker`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ project }),
    });

    const data = await res.json();
    (data.events || []).forEach((e) =>
      pushDeploy(`[${e.kind}] ${e.message}`)
    );
  }

  async function cloneRepo() {
    const res = await fetch(`${API_BASE}/api/github/clone`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ project, repo_url: githubUrl }),
    });

    const data = await res.json();
    (data.events || []).forEach((e) =>
      pushLog(`[${e.kind}] ${e.message}`)
    );
  }

  return (
    <section className="studio-panel">
      <div className="studio-panel-header">
        <h2>Run · Deploy · GitHub</h2>
        <span>{project}</span>
      </div>

      <div className="studio-panel-body">
        <button className="btn btn-primary" onClick={runBackend}>
          ▶ Backend
        </button>

        <button className="btn btn-primary" onClick={runFrontend}>
          ▶ Frontend
        </button>

        <button
          className="btn btn-primary"
          style={{ marginTop: 8 }}
          onClick={deployWorker}
        >
          Deploy Worker
        </button>

        <input
          className="input"
          style={{ marginTop: 8 }}
          placeholder="GitHub repo URL"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
        />

        <button className="btn btn-primary" onClick={cloneRepo}>
          Clone Repo
        </button>

        <div className="log-panel" style={{ marginTop: 10 }}>
          <div className="field-label">Run Logs</div>
          {logs.map((l, i) => (
            <div key={i} className="event-line">
              {l}
            </div>
          ))}
        </div>

        <div className="log-panel" style={{ marginTop: 10 }}>
          <div className="field-label">Deploy Logs</div>
          {deployLogs.map((l, i) => (
            <div key={i} className="event-line">
              {l}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// IMPORTANT: expose globally for UMD React
window.RunDeployPanel = RunDeployPanel;
