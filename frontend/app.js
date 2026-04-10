import CapabilitiesPanel from "./components/CapabilitiesPanel.jsx";
import ProjectSwitcher from "./components/ProjectSwitcher.jsx";
import FileTree from "./components/FileTree.jsx";
import Editor from "./components/Editor.jsx";
import RunDeployPanel from "./components/RunDeployPanel.jsx";
import PreviewPanel from "./components/PreviewPanel.jsx";
import PluginSlots from "./components/PluginSlots.jsx";
import CloudflarePanel from "./components/CloudflarePanel.jsx";

const { useState, useEffect } = React;

const API_BASE = "http://localhost:8000";

function StudioApp() {
  const [theme, setTheme] = useState("gold");
  const [view, setView] = useState("studio"); // studio | capabilities
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState("");
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const [plugins, setPlugins] = useState([]);

  // THEME
  useEffect(() => {
    document.body.classList.remove("theme-gold", "theme-red", "theme-white");
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  // LOAD PROJECTS
  async function loadProjects() {
    const res = await fetch(`${API_BASE}/api/workspace/projects`);
    const data = await res.json();
    setProjects(data.projects || []);
    if (!project && data.projects.length > 0) {
      setProject(data.projects[0]);
    }
  }

  // LOAD FILES
  async function loadFiles() {
    if (!project) return;
    const res = await fetch(`${API_BASE}/api/files/list?project=${project}`);
    const data = await res.json();
    setFiles(data.items || []);
  }

  // LOAD PLUGINS
  async function loadPlugins() {
    const res = await fetch(`${API_BASE}/api/plugins`);
    const data = await res.json();
    setPlugins(data.plugins || []);
  }

  // OPEN FILE
  async function openFile(path) {
    setSelectedFile(path);
    const res = await fetch(
      `${API_BASE}/api/files/read?project=${project}&path=${path}`
    );
    const data = await res.json();
    setFileContent(data.content || "");
  }

  // SAVE FILE
  async function saveFile() {
    if (!selectedFile) return;
    await fetch(`${API_BASE}/api/files/write`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project,
        path: selectedFile,
        content: fileContent,
      }),
    });
  }

  // INIT
  useEffect(() => {
    loadProjects();
    loadPlugins();
  }, []);

  useEffect(() => {
    loadFiles();
  }, [project]);

  return (
    <div className="studio-shell">
      {/* HEADER */}
      <header className="studio-header">
        <div className="studio-title-block">
          <div className="studio-logo" />
          <div className="studio-title-text">
            <h1>Boardwalk Studio</h1>
            <span>Autonomous Builder · IDE · Cloudflare Engine</span>
          </div>
        </div>

        <div className="studio-header-right">
          <ProjectSwitcher
            projects={projects}
            project={project}
            setProject={setProject}
            loadProjects={loadProjects}
          />

          <div className="theme-switcher">
            <span style={{ fontSize: 10 }}>Theme</span>
            <button
              className={`theme-pill ${theme === "gold" ? "active" : ""}`}
              onClick={() => setTheme("gold")}
            >
              Gold
            </button>
            <button
              className={`theme-pill ${theme === "red" ? "active" : ""}`}
              onClick={() => setTheme("red")}
            >
              Red
            </button>
            <button
              className={`theme-pill ${theme === "white" ? "active" : ""}`}
              onClick={() => setTheme("white")}
            >
              White
            </button>
          </div>

          <button
            className="btn btn-ghost"
            onClick={() =>
              setView(view === "studio" ? "capabilities" : "studio")
            }
          >
            {view === "studio" ? "Capabilities" : "Studio"}
          </button>
        </div>
      </header>

      {/* MAIN */}
      {view === "capabilities" ? (
        <CapabilitiesPanel />
      ) : (
        <main className="studio-main">
          {/* LEFT: FILE TREE */}
          <FileTree
            files={files}
            selectedFile={selectedFile}
            openFile={openFile}
          />

          {/* CENTER: EDITOR */}
          <Editor
            selectedFile={selectedFile}
            fileContent={fileContent}
            setFileContent={setFileContent}
            saveFile={saveFile}
          />

          {/* RIGHT: RUN / DEPLOY / CLOUDFLARE / PLUGINS */}
          <RunDeployPanel project={project} API_BASE={API_BASE} />
          <CloudflarePanel project={project} API_BASE={API_BASE} />
          <PluginSlots plugins={plugins} />
        </main>
      )}

      {/* PREVIEW */}
      <PreviewPanel />

      {/* FOOTER */}
      <footer className="studio-footer">
        <span>Boardwalk Studio · Full Stack · Cloudflare Ready</span>
        <span>Project: {project || "none"}</span>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<StudioApp />);
