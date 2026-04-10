function FileTree({ files, selectedFile, openFile }) {
  return (
    <section className="studio-panel">
      <div className="studio-panel-header">
        <h2>Files</h2>
        <span>{files.length} items</span>
      </div>

      <div className="studio-panel-body">
        <div className="file-tree">
          {files.map((item, idx) => (
            <div
              key={idx}
              className={`file-tree-item ${
                selectedFile === item.path ? "active" : ""
              }`}
              onClick={() => item.type === "file" && openFile(item.path)}
            >
              <span className="file-tree-type">
                {item.type === "dir" ? "DIR" : "FILE"}
              </span>
              <span className="file-tree-path">{item.path}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// IMPORTANT: expose globally for UMD React
window.FileTree = FileTree;
