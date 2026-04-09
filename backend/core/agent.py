from typing import List, Dict
from .paths import get_project_root

def run_agent(req) -> List[Dict]:
  """
  This is your local autonomous builder.
  Right now it just logs steps; you can expand it to actually scaffold.
  """
  events: List[Dict] = []
  root = get_project_root(req.project)

  events.append({"kind": "system", "message": f"Starting agent for project '{req.project}' with stack '{req.stack}'."})
  events.append({"kind": "agent", "message": f"Goal: {req.goal}"})
  events.append({"kind": "agent", "message": f"Workspace root: {root}"})

  # Here is where you'd call your real scaffolders:
  # - create backend skeleton
  # - create frontend skeleton
  # - create db schema
  # - create cloudflare config
  # - create PWA files
  # - create AI app stubs
  # For now we just log that these steps would happen.

  if req.allow_scaffold:
    events.append({"kind": "agent", "message": "Scaffolding full stack structure (backend, frontend, db, cloudflare, pwa)..."})
  if req.allow_db:
    events.append({"kind": "agent", "message": "Preparing database schema and migrations..."})
  if req.allow_api:
    events.append({"kind": "agent", "message": "Preparing API routes and controllers..."})
  if req.allow_auth:
    events.append({"kind": "agent", "message": "Preparing auth helpers and token logic..."})
  if req.allow_media:
    events.append({"kind": "agent", "message": "Preparing media handling (R2, uploads, processing)..."})
  if req.allow_cloudflare:
    events.append({"kind": "agent", "message": "Preparing Cloudflare Worker, KV, D1, R2, Queues, Cron config..."})
  if req.allow_frontend:
    events.append({"kind": "agent", "message": "Preparing frontend app shell and routes..."})
  if req.allow_service_worker:
    events.append({"kind": "agent", "message": "Preparing service worker and PWA manifest..."})
  if req.allow_deploy:
    events.append({"kind": "agent", "message": "Preparing deploy scripts and notes..."})
  if req.allow_ai_apps:
    events.append({"kind": "agent", "message": "Preparing AI app stubs (music, video, image transforms)..."})

  events.append({"kind": "system", "message": "Agent run complete (stub). Expand this to write real files."})
  return events
