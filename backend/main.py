from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any

from core import paths
from core import files as files_core
from core import runners
from core import cloudflare
from core import github as github_core
from core import agent as agent_core
from core import errors as errors_core
from core import ai as ai_core
from core import plugins as plugins_core

app = FastAPI(title="Boardwalk Studio Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- MODELS ----------

class AgentRunRequest(BaseModel):
    project: str
    goal: str
    stack: str
    mode: str = "full"
    allow_scaffold: bool = True
    allow_db: bool = True
    allow_api: bool = True
    allow_auth: bool = True
    allow_media: bool = True
    allow_cloudflare: bool = True
    allow_frontend: bool = True
    allow_service_worker: bool = True
    allow_deploy: bool = True
    allow_fix: bool = True
    allow_ai_apps: bool = True


class FileWriteRequest(BaseModel):
    project: str
    path: str
    content: str


class RunRequest(BaseModel):
    project: str


class CloudflareDeployRequest(BaseModel):
    project: str


class GithubCloneRequest(BaseModel):
    project: str
    repo_url: str


class ErrorFixRequest(BaseModel):
    project: str
    errors: str


class AIInvokeRequest(BaseModel):
    project: str
    kind: str
    payload: Dict[str, Any]


class WorkspaceCreateRequest(BaseModel):
    name: str


class PluginRegisterRequest(BaseModel):
    name: str
    kind: str
    config: Dict[str, Any]


# ---------- ROOT ----------

@app.get("/")
def root():
    return {
        "name": "Boardwalk Studio Backend",
        "status": "ok",
        "workspace_root": str(paths.get_workspace_root()),
    }


# ---------- WORKSPACE (handled inside paths module) ----------

@app.get("/api/workspace/projects")
def list_projects():
    return {"projects": paths.list_projects()}


@app.post("/api/workspace/projects")
def create_project(req: WorkspaceCreateRequest):
    paths.create_project(req.name)
    return {"ok": True, "project": req.name}


# ---------- FILES ----------

@app.get("/api/files/list")
def list_files(project: str = Query(...)):
    items = files_core.list_project_files(project)
    return {"items": items}


@app.get("/api/files/read")
def read_file(project: str = Query(...), path: str = Query(...)):
    content = files_core.read_project_file(project, path)
    return {"content": content}


@app.post("/api/files/write")
def write_file(req: FileWriteRequest):
    files_core.write_project_file(req.project, req.path, req.content)
    return {"ok": True}


# ---------- RUNNERS ----------

@app.post("/api/run/backend")
def run_backend(req: RunRequest):
    runners.run_backend(req.project)
    return {"ok": True, "message": "Backend dev server started (if configured)."}


@app.post("/api/run/frontend")
def run_frontend(req: RunRequest):
    runners.run_frontend(req.project)
    return {"ok": True, "message": "Frontend dev server started (if configured)."}


# ---------- CLOUDFLARE ----------

@app.post("/api/cloudflare/deploy_worker")
def deploy_worker(req: CloudflareDeployRequest):
    events = cloudflare.deploy_worker(req.project)
    return {"ok": True, "events": events}


@app.get("/api/cloudflare/worker_logs")
def worker_logs(project: str = Query(...), limit: int = 50):
    logs = cloudflare.fetch_worker_logs(project, limit=limit)
    return {"logs": logs}


@app.post("/api/cloudflare/create_d1")
def create_d1(req: CloudflareDeployRequest):
    return cloudflare.create_d1(req.project)


@app.post("/api/cloudflare/create_r2")
def create_r2(req: CloudflareDeployRequest):
    return cloudflare.create_r2(req.project)


@app.post("/api/cloudflare/create_kv")
def create_kv(req: CloudflareDeployRequest):
    return cloudflare.create_kv(req.project)


@app.post("/api/cloudflare/create_queue")
def create_queue(req: CloudflareDeployRequest):
    return cloudflare.create_queue(req.project)


@app.post("/api/cloudflare/deploy_pages")
def deploy_pages(req: CloudflareDeployRequest):
    return cloudflare.deploy_pages(req.project)


# ---------- GITHUB ----------

@app.post("/api/github/clone")
def github_clone(req: GithubCloneRequest):
    events = github_core.clone_repo(req.project, req.repo_url)
    return {"ok": True, "events": events}


# ---------- AGENT ----------

@app.post("/api/agent/run")
def agent_run(req: AgentRunRequest):
    events = agent_core.run_agent(req)
    return {"ok": True, "events": events}


@app.post("/api/agent/fix_errors")
def agent_fix_errors(req: ErrorFixRequest):
    events = errors_core.log_and_analyze_errors(req.project, req.errors)
    return {"ok": True, "events": events}


# ---------- AI LAYER ----------

@app.post("/api/ai/invoke")
def ai_invoke(req: AIInvokeRequest):
    return ai_core.invoke_ai(req.project, req.kind, req.payload)


# ---------- PLUGINS ----------

@app.get("/api/plugins")
def list_plugins():
    return {"plugins": plugins_core.list_plugins()}


@app.post("/api/plugins/register")
def register_plugin(req: PluginRegisterRequest):
    plugins_core.register_plugin(req.name, req.kind, req.config)
    return {"ok": True}


@app.get("/api/plugins/ui")
def plugins_ui():
    return {"ui_slots": plugins_core.get_ui_slots()}
