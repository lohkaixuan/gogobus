# services/maps_service.py
import os
import httpx
from data.mock_data import mockRoutes

GOOGLE_MAPS_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")

async def get_routes(origin: str, destination: str):
    # Return mock routes if API key is missing
    if not GOOGLE_MAPS_API_KEY:
        return mockRoutes

    url = "https://routes.googleapis.com/directions/v2:computeRoutes"
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
        "X-Goog-FieldMask": "*"
    }

    body = {
        "origin": {"address": origin},
        "destination": {"address": destination},
        "travelMode": "WALK"
    }

    try:
        async with httpx.AsyncClient() as client:
            r = await client.post(url, headers=headers, json=body)
            r.raise_for_status()
            data = r.json()
    except Exception as e:
        print(f"[MapsService] Error fetching routes: {e}")
        # Fallback to mock routes
        return mockRoutes

    routes = []
    for idx, route in enumerate(data.get("routes", [])):
        # Handle missing fields gracefully
        duration = route.get("duration", 0)
        distance = route.get("distanceMeters", 0) / 1000
        walking_segments = []

        for leg in route.get("legs", []):
            for step in leg.get("steps", []):
                walking_segments.append({
                    "distance": step.get("distanceMeters", 0) / 1000,
                    "duration": step.get("duration", 0) // 60,  # convert sec → min
                    "startPoint": step.get("startLocation", {}).get("address", ""),
                    "endPoint": step.get("endLocation", {}).get("address", ""),
                    "isLastMile": False
                })

            if walking_segments:
                walking_segments[-1]["isLastMile"] = True

        routes.append({
            "id": str(idx + 1),
            "name": f"Route {idx + 1}",
            "type": "standard",
            "duration": duration // 60,  # seconds → minutes
            "distance": distance,
            "walkingSegments": walking_segments,
            "crowdLevel": "Medium",
            "transportModes": ["Walk"],
            "scenicWaypoints": []
        })

    # If no routes returned from Google, fallback to mock
    if not routes:
        return mockRoutes

    return routes
