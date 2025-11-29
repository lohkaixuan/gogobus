# ZenWay Backend

ZenWay is a backend service for a healthy commuting app. It recommends walking and transit routes based on air quality, crowd levels, and personal health metrics, with LLM grounding for intelligent explanations.

## Features

- Fetch routes from Google Maps or mock data
- Enrich routes with air quality (AQI) and health metrics
- Score and rank routes
- LLM-based explanations via Vertex AI
- Supports reroute suggestions

## Tech Stack

- Python 3.13+
- FastAPI
- Async HTTP requests with `httpx`
- Google Maps Routes API
- Open-Meteo Air Quality API
- Vertex AI Generative AI
- Pydantic for data validation

## Setup

1. **Clone the repository**:

```bash
git clone https://github.com/yourusername/zenway-backend.git
cd zenway-backend
```

2. **Create a virtual environment**:

```bash
python -m venv venv
# Linux / macOS
source venv/bin/activate
# Windows
venv\Scripts\activate
```

3. **Install dependencies**:

```bash
pip install -r requirements.txt
```

4. **Add environment variables in a .env file**

5. **Run the server**:

```bash
uvicorn main:app --reload --port 8000
```

6. **Test the API**:

Root endpoint: http://127.0.0.1:8000

Recommend route endpoint: POST /recommend-route with JSON body:

```bash
{
  "origin": "Times Square, New York",
  "destination": "Central Park, New York"
}
```
