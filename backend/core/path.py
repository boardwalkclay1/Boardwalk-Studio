from pathlib import Path

def get_workspace_root() -> Path:
  # root of boardwalk-studio
  return Path(__file__).resolve().parents[2]

def get_backend_root() -> Path:
  return get_workspace_root() / "backend"

def get_frontend_root() -> Path:
  return get_workspace_root() / "frontend"

def get_projects_root() -> Path:
  root = get_workspace_root() / "workspace"
  root.mkdir(parents=True, exist_ok=True)
  return root

def get_project_root(project: str) -> Path:
  root = get_projects_root() / project
  root.mkdir(parents=True, exist_ok=True)
  return root
