import subprocess
import sys
from pathlib import Path
from .paths import get_project_root

def _run_command(cmd, cwd: Path):
  subprocess.Popen(
    cmd,
    cwd=str(cwd),
    shell=True,
    stdout=subprocess.DEVNULL,
    stderr=subprocess.DEVNULL,
  )

def run_backend(project: str):
  root = get_project_root(project)
  backend_dir = root / "backend"
  if backend_dir.exists():
    if (backend_dir / "package.json").exists():
      _run_command("npm run dev", backend_dir)
    elif (backend_dir / "pyproject.toml").exists() or (backend_dir / "main.py").exists():
      _run_command(f"{sys.executable} -m uvicorn main:app --reload --host 0.0.0.0 --port 8000", backend_dir)

def run_frontend(project: str):
  root = get_project_root(project)
  frontend_dir = root / "frontend"
  if frontend_dir.exists() and (frontend_dir / "package.json").exists():
    _run_command("npm run dev", frontend_dir)
