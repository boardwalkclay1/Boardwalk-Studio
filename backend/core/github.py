import subprocess
from pathlib import Path
from typing import List, Dict
from .paths import get_project_root

def clone_repo(project: str, repo_url: str) -> List[Dict]:
  events: List[Dict] = []
  root = get_project_root(project)
  try:
    events.append({"kind": "system", "message": f"Cloning {repo_url} into {root}..."})
    subprocess.check_call(
      f"git clone {repo_url} .",
      cwd=str(root),
      shell=True,
    )
    events.append({"kind": "agent", "message": "Clone completed."})
  except subprocess.CalledProcessError as e:
    events.append({"kind": "error", "message": f"Git clone failed: {e}"})
  except Exception as e:
    events.append({"kind": "error", "message": f"Git error: {e}"})
  return events
