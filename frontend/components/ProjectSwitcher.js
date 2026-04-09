export default function ProjectSwitcher({
  projects,
  project,
  setProject,
  loadProjects,
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <select
        className="select"
        style={{ width: 150 }}
        value={project}
        onChange={(e) => setProject(e.target.value)}
      >
        {projects.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <button className="btn btn-ghost" onClick={loadProjects}>
        Refresh
      </button>
    </div>
  );
}
