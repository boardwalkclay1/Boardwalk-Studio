import subprocess
from pathlib import Path
from typing import List, Dict
from .paths import get_project_root

def _run_wrangler(args: str, cwd: Path) -> List[Dict]:
  events: List[Dict] = []
  try:
    proc = subprocess.Popen(
      f"wrangler {args}",
      cwd=str(cwd),
      shell=True,
      stdout=subprocess.PIPE,
      stderr=subprocess.STDOUT,
      text=True,
    )
    if proc.stdout:
      for line in proc.stdout:
        line = line.rstrip()
        if line:
          events.append({"kind": "system", "message": line})
    proc.wait()
    if proc.returncode != 0:
      events.append({"kind": "error", "message": f"wrangler exited with {proc.returncode}"})
  except Exception as e:
    events.append({"kind": "error", "message": f"wrangler error: {e}"})
  return events

def deploy_worker(project: str) -> List[Dict]:
  root = get_project_root(project)
  cloudflare_dir = root / "cloudflare"
  if not cloudflare_dir.exists():
    return [{"kind": "error", "message": "cloudflare/ directory not found in project."}]
  return _run_wrangler("deploy", cloudflare_dir)

def fetch_worker_logs(project: str, limit: int = 50):
  # simple stub: you can wire real Cloudflare logs API here later
  return [
    {"level": "info", "message": "Worker logs viewer stub. Integrate Cloudflare logs API here."},
    {"level": "info", "message": f"Project: {project}, limit: {limit}"},
  ]

def create_d1(project: str):
  # stub for now; wire Cloudflare API or wrangler d1 commands
  return {"ok": True, "message": "D1 creation stub. Integrate Cloudflare D1 API/wrangler here."}

def create_r2(project: str):
  return {"ok": True, "message": "R2 creation stub. Integrate Cloudflare R2 API/wrangler here."}

def create_kv(project: str):
  return {"ok": True, "message": "KV creation stub. Integrate Cloudflare KV API/wrangler here."}

def create_queue(project: str):
  return {"ok": True, "message": "Queue creation stub. Integrate Cloudflare Queues API/wrangler here."}

def deploy_pages(project: str):
  return {"ok": True, "message": "Pages deploy stub. Integrate Cloudflare Pages API/wrangler here."}
