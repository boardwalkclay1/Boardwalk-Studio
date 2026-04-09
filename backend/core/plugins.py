from typing import List, Dict, Any

# simple in-memory registry; you can persist later if you want
_PLUGINS: List[Dict[str, Any]] = []

def register_plugin(name: str, kind: str, config: Dict[str, Any]):
  _PLUGINS.append({"name": name, "kind": kind, "config": config})

def list_plugins() -> List[Dict[str, Any]]:
  return list(_PLUGINS)

def get_ui_slots() -> List[Dict[str, Any]]:
  """
  Example: plugins can declare UI slots like 'right-panel', 'bottom-panel', etc.
  For now we just echo the registered plugins.
  """
  return [
    {
      "name": p["name"],
      "kind": p["kind"],
      "slot": p["config"].get("slot", "right-panel"),
      "label": p["config"].get("label", p["name"]),
    }
    for p in _PLUGINS
  ]
