export default function Editor({
  selectedFile,
  fileContent,
  setFileContent,
  saveFile,
}) {
  return (
    <section className="studio-panel">
      <div className="studio-panel-header">
        <h2>Editor</h2>
        <span>{selectedFile || "No file selected"}</span>
      </div>
      <div className="studio-panel-body">
        <textarea
          className="editor-textarea"
          value={fileContent}
          onChange={(e) => setFileContent(e.target.value)}
          disabled={!selectedFile}
          placeholder="Select a file to edit"
        />

        <button
          className="btn btn-primary"
          style={{ marginTop: 8 }}
          onClick={saveFile}
          disabled={!selectedFile}
        >
          Save File
        </button>
      </div>
    </section>
  );
}
