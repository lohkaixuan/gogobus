# services/scoring.py
def score_route(route, aqi_mean: int, health):
    aqi_norm = min(aqi_mean, 200) / 200
    crowd = route.get("crowdLevel", "Medium")
    crowd_score = {"Low": 0, "Medium": 0.5, "High": 1}.get(crowd, 0.5)

    distance = route.get("distance", 1)
    scenic_bonus = len(route.get("scenicWaypoints", []))

    score = 100
    score -= aqi_norm * 40
    score -= crowd_score * 20
    score -= distance * 2
    score += scenic_bonus * 3

    if health.get("has_asthma", False) and aqi_mean > 100:
        score -= 15

    return round(score)
