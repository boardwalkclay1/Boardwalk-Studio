from typing import Dict, Any

def invoke_ai(project: str, kind: str, payload: Dict[str, Any]):
  """
  AI integration layer.
  Right now this is a stub that just echoes.
  You can wire OpenAI/Anthropic/etc here later.
  """
  return {
    "ok": True,
    "project": project,
    "kind": kind,
    "payload": payload,
    "message": "AI layer stub. Plug in real model calls here.",
  }
