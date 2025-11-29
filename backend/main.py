# main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Any

from services.maps_service import get_routes
from services.aqi_service import enrich_route_with_aqi
from services.scoring import score_route
from services.llm_service import call_vertex_grounding
from data.mock_data import mockHealthMetrics, mockRerouteOptions

app = FastAPI(title="ZenWay Backend", version="1.0")

# Pydantic schemas
class RouteRequest(BaseModel):
    origin: str
    destination: str
    uid: Optional[str] = None  # for future personalization

# Root route
@app.get("/")
async def root():
    return {"message": "ZenWay Backend Running!"}

# Recommend route endpoint
@app.post("/recommend-route")
async def recommend_route(req: RouteRequest):
    try:
        # 1) Fetch routes from Maps service or mock
        routes: List[Dict[str, Any]] = await get_routes(req.origin, req.destination)

        enriched_routes: List[Dict[str, Any]] = []

        # 2) Add AQI and scoring
        for route in routes:
            aqi_info = await enrich_route_with_aqi(route)
            score = score_route(route, aqi_info["mean"], mockHealthMetrics)
            enriched_routes.append({**route, "aqi": aqi_info, "score": score})

        # 3) Rank routes by score (descending)
        ranked_routes = sorted(enriched_routes, key=lambda r: r["score"], reverse=True)

        # 4) LLM grounding via Vertex AI
        grounded_routes = await call_vertex_grounding(
            ranked_routes=ranked_routes,
            health_profile=mockHealthMetrics,
            reroute_options=mockRerouteOptions
        )
        
        return {
            "ok": True,
            "ranked_routes": ranked_routes,
            "grounded_routes": grounded_routes
        }

    except Exception as e:
        # Return detailed error in development
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
