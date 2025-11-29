import httpx
import random

OPEN_METEO_URL = (
    "https://air-quality-api.open-meteo.com/v1/air-quality"
)


async def enrich_route_with_aqi(route):
    import random

    scenic_points = route.get("scenicWaypoints") or []
    if scenic_points:
        lat = scenic_points[0].get("position", {}).get("lat", 40.7128)
        lng = scenic_points[0].get("position", {}).get("lng", -74.0060)
    else:
        lat, lng = 40.7128, -74.0060  # Default coordinates

    # Use existing AQI from mock
    if "aqi" in route:
        base = route["aqi"]
        samples = [max(10, base + random.randint(-12, 12)) for _ in range(5)]
        return {"samples": samples, "mean": sum(samples) // len(samples)}

    # Example placeholder if you integrate real AQI API
    samples = [50 + random.randint(-5, 5) for _ in range(5)]
    return {"samples": samples, "mean": sum(samples) // len(samples)}
