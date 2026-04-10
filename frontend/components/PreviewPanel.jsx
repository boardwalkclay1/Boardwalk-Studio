export default function PreviewPanel() {
  return (
    <section className="studio-panel" style={{ margin: 10 }}>
      <div className="studio-panel-header">
        <h2>Live Preview</h2>
        <span>http://localhost:5173</span>
      </div>
      <div className="studio-panel-body">
        <iframe
          src="http://localhost:5173"
          style={{
            width: "100%",
            height: "300px",
            border: "none",
            borderRadius: 10,
          }}
        />
      </div>
    </section>
  );
}
