# data/mock_data.py

mockRoutes = [
    {
        "id": "1",
        "name": "Zen Route",
        "type": "health",
        "duration": 25,
        "aqi": 35,
        "crowdLevel": "Low",
        "distance": 4.2,
        "walkingSegments": [
            {
                "distance": 0.8,
                "duration": 10,
                "startPoint": "Transit Station",
                "endPoint": "Destination",
                "isLastMile": True,
            }
        ],
        "transportModes": ["Walk", "Tram", "Walk"],
        "co2Saved": 200,
        "caloriesBurned": 80,
        "exposureLevel": [20, 25, 30, 35, 30, 25, 20],
        "scenicWaypoints": [
            {
                "type": "tree",
                "name": "City Park",
                "position": {"lat": 40.7128, "lng": -74.0060},
                "description": "High Oxygen Zone",
            },
            {
                "type": "shade",
                "name": "Tree Canopy",
                "position": {"lat": 40.7138, "lng": -74.0070},
                "description": "Shaded pathway",
            },
            {
                "type": "water",
                "name": "Riverside Path",
                "position": {"lat": 40.7148, "lng": -74.0080},
                "description": "Scenic waterfront",
            },
        ],
    },
    {
        "id": "2",
        "name": "Fastest Route",
        "type": "fast",
        "duration": 20,
        "aqi": 110,
        "crowdLevel": "High",
        "distance": 3.8,
        "walkingSegments": [
            {
                "distance": 0.3,
                "duration": 4,
                "startPoint": "Transit Station",
                "endPoint": "Destination",
                "isLastMile": True,
            }
        ],
        "transportModes": ["Walk", "Bus", "Walk"],
        "exposureLevel": [80, 90, 110, 105, 95, 85, 80],
        "scenicWaypoints": [],
    },
    {
        "id": "3",
        "name": "Balanced Route",
        "type": "standard",
        "duration": 23,
        "aqi": 65,
        "crowdLevel": "Medium",
        "distance": 4.0,
        "walkingSegments": [
            {
                "distance": 0.5,
                "duration": 7,
                "startPoint": "Transit Station",
                "endPoint": "Destination",
                "isLastMile": True,
            }
        ],
        "transportModes": ["Walk", "Metro", "Walk"],
        "co2Saved": 120,
        "caloriesBurned": 50,
        "exposureLevel": [45, 55, 65, 70, 65, 55, 50],
        "scenicWaypoints": [
            {
                "type": "camera",
                "name": "City Viewpoint",
                "position": {"lat": 40.7133, "lng": -74.0065},
                "description": "Great photo spot",
            }
        ],
    },
]

mockHealthMetrics = {
    "breathabilityScore": 8.5,
    "pollutantsAvoided": 0,
    "zenPoints": 1250,
    "dailySteps": 6500,
    "dailyStepsGoal": 7000,
}

mockRerouteOptions = [
    {
        "id": "r1",
        "type": "health",
        "name": "The Health Backup",
        "description": "Grab a scooter (2 min walk). Scenic route through the waterfront.",
        "icon": "scooter",
        "delay": 4,
        "crowdLevel": "Low",
        "stressLevel": 2,
        "details": "Bypass the crowd",
    },
    {
        "id": "r2",
        "type": "standard",
        "name": "The Standard Backup",
        "description": "Wait for next bus. Standing room only expected.",
        "icon": "bus",
        "delay": 15,
        "crowdLevel": "High",
        "stressLevel": 8,
        "details": "High Crowd Warning",
    },
]
