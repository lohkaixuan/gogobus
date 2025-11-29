# services/llm_service.py
import os
import google.generativeai as genai
from typing import List, Dict, Any

MODEL = os.getenv("VERTEX_MODEL", "gemini-1.5-pro")
VERTEX_API_KEY = os.getenv("VERTEX_API_KEY")

# Configure Vertex AI only if key exists
if VERTEX_API_KEY:
    genai.configure(api_key=VERTEX_API_KEY)

async def call_vertex_grounding(
    ranked_routes: List[Dict[str, Any]],
    health_profile: Dict[str, Any],
    reroute_options: List[Dict[str, Any]]
) -> Dict[str, Any]:
    # If key not set, return a mock response for testing
    if not VERTEX_API_KEY:
        return {
            "recommendedRouteId": ranked_routes[0]["id"] if ranked_routes else None,
            "explanation": "This route balances health and convenience.",
            "safetyTips": ["Wear mask in high AQI areas", "Stay hydrated"],
            "alternatives": [r["id"] for r in ranked_routes[1:]]
        }

    prompt = f"""
SYSTEM:
You must NOT invent any numbers. Use only the routes provided.

USER:
Recommend the healthiest route.

CONTEXT:
ROUTES: {ranked_routes}
HEALTH_PROFILE: {health_profile}
REROUTE_OPTIONS: {reroute_options}

Return strictly JSON:
{{
 "recommendedRouteId": "...",
 "explanation": "...",
 "safetyTips": [...],
 "alternatives": [...]
}}
"""

    response = genai.GenerativeModel(MODEL).generate_content(
        prompt,
        generation_config={
            "temperature": 0.0,
            "max_output_tokens": 256,
        }
    )

    return response.text.strip()
