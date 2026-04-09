from pathlib import Path
from typing import List, Dict
from .paths import get_project_root

def log_and_analyze_errors(project: str, errors: str) -> List[Dict]:
  events: List[Dict] = []
  root = get_project_root(project)
  log_dir = root / "logs"
  log_dir.mkdir(parents=True, exist_ok=True)
  log_file = log_dir / "errors.log"
  with log_file.open("a", encoding="utf-8") as f:
    f.write("\n\n=== NEW ERROR BLOCK ===\n")
    f.write(errors)
    f.write("\n")
  events.append({"kind": "system", "message": f"Errors appended to {log_file}."})
  events.append({"kind": "agent", "message": "You can now wire an AI model to analyze this log and propose fixes."})
  return events
