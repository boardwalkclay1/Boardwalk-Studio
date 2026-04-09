from pathlib import Path
from typing import List, Dict
from .paths import get_project_root

def list_project_files(project: str) -> List[Dict]:
  root = get_project_root(project)
  items: List[Dict] = []
  for path in root.rglob("*"):
    rel = path.relative_to(root).as_posix()
    if path.is_dir():
      items.append({"type": "dir", "path": rel})
    else:
      items.append({"type": "file", "path": rel})
  return items

def read_project_file(project: str, rel_path: str) -> str:
  root = get_project_root(project)
  path = root / rel_path
  if not path.exists():
    return ""
  return path.read_text(encoding="utf-8", errors="ignore")

def write_project_file(project: str, rel_path: str, content: str) -> None:
  root = get_project_root(project)
  path = root / rel_path
  path.parent.mkdir(parents=True, exist_ok=True)
  path.write_text(content, encoding="utf-8")
