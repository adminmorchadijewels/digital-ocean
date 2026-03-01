# Sentiment Analyzer

A full-stack sentiment analysis application with a React frontend and a Python/FastAPI backend powered by **VADER** — a lightweight, rule-based sentiment analyzer that runs without GPU or large model downloads.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser / Client                         │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │            React (Vite + TailwindCSS)                   │  │
│   │          served by nginx on port 80/3000                │  │
│   └────────────────────┬────────────────────────────────────┘  │
│                        │ HTTP POST /analyze                     │
└────────────────────────┼────────────────────────────────────────┘
                         │
         ┌───────────────▼──────────────────┐
         │     FastAPI + VADER backend      │
         │       Python 3.11 · port 8000    │
         │                                  │
         │  GET  /health  → 200 ok          │
         │  POST /analyze → sentiment JSON  │
         └──────────────────────────────────┘
```

**Stack:**

| Layer     | Technology              | Why                                    |
|-----------|-------------------------|----------------------------------------|
| Frontend  | React 18, Vite, Tailwind | Fast DX, tiny prod bundle              |
| Backend   | FastAPI, Uvicorn        | Async, auto-docs, type-safe            |
| ML model  | VADER (vaderSentiment)  | No GPU, ~1 MB, sub-millisecond latency |
| Container | Docker (multi-stage)    | Reproducible, small images             |
| Proxy     | nginx                   | Static files + SPA routing             |

---

## Local Development

### Prerequisites

- Docker ≥ 24 + Docker Compose plugin
- Node 20 (optional, for frontend hot-reload)
- Python 3.11 (optional, for backend hot-reload)

### Run with Docker Compose

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/sentiment-app.git
cd sentiment-app

# Copy env files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Build and start both services
docker compose up --build

# Frontend → http://localhost:3000
# API docs  → http://localhost:8000/docs
```

### Run services individually (hot-reload)

**Backend:**

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

**Frontend:**

```bash
cd frontend
npm install
VITE_API_URL=http://localhost:8000 npm run dev
# → http://localhost:5173
```

---

## API Documentation

Interactive Swagger UI is available at `http://localhost:8000/docs` when running locally.

### `GET /health`

Liveness check.

```http
GET /health HTTP/1.1
```

**Response `200 OK`:**

```json
{
  "status": "ok",
  "service": "sentiment-api"
}
```

---

### `POST /analyze`

Analyze the sentiment of a text string.

**Request:**

```http
POST /analyze HTTP/1.1
Content-Type: application/json

{
  "text": "I absolutely love this product! It works perfectly."
}
```

| Field  | Type   | Required | Max length | Description           |
|--------|--------|----------|------------|-----------------------|
| `text` | string | yes      | 5000 chars | Text to be evaluated  |

**Response `200 OK`:**

```json
{
  "label": "POSITIVE",
  "score": 0.9412,
  "compound": 0.8718,
  "details": {
    "positive": 0.521,
    "negative": 0.0,
    "neutral": 0.479
  },
  "processing_time_ms": 0.41
}
```

| Field                | Type   | Description                                        |
|----------------------|--------|----------------------------------------------------|
| `label`              | string | `POSITIVE` \| `NEGATIVE` \| `NEUTRAL`              |
| `score`              | float  | Confidence in the predicted label (0.5 – 1.0)     |
| `compound`           | float  | Raw VADER compound score (–1.0 = most negative)    |
| `details.positive`   | float  | Proportion of positive tokens (0.0 – 1.0)         |
| `details.negative`   | float  | Proportion of negative tokens (0.0 – 1.0)         |
| `details.neutral`    | float  | Proportion of neutral tokens (0.0 – 1.0)          |
| `processing_time_ms` | float  | Server-side processing time in milliseconds       |

**Error `422 Unprocessable Entity`** — when `text` is missing, empty, or over the character limit.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable          | Default                              | Description                              |
|-------------------|--------------------------------------|------------------------------------------|
| `ALLOWED_ORIGINS` | `http://localhost:3000,...`          | Comma-separated CORS origins (`*` = all) |
| `LOG_LEVEL`       | `info`                               | Uvicorn log level                        |

### Frontend (`frontend/.env`)

| Variable       | Default                   | Description                              |
|----------------|---------------------------|------------------------------------------|
| `VITE_API_URL` | `http://localhost:8000`   | Backend API base URL (no trailing slash) |

---

## DigitalOcean Deployment

### Option A — App Platform (Recommended)

Estimated cost: **~$10/month** (two `basic-xxs` instances @ $5 each).

#### 1. Install `doctl`

```bash
# macOS
brew install doctl

# Linux
cd /tmp && curl -sL https://github.com/digitalocean/doctl/releases/download/v1.110.0/doctl-1.110.0-linux-amd64.tar.gz | tar xz
sudo mv doctl /usr/local/bin
```

#### 2. Authenticate

```bash
doctl auth init
# Paste your DigitalOcean API token when prompted
# Generate one at: https://cloud.digitalocean.com/account/api/tokens
```

#### 3. Edit the app spec

Open `.do/app.yaml` and replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

#### 4. Create the app

```bash
doctl apps create --spec .do/app.yaml
```

#### 5. Check deployment status

```bash
doctl apps list
# Copy the app ID from the output, then:
doctl apps list-deployments <app-id>
```

#### 6. Open the app

```bash
doctl apps get <app-id> --format LiveURL
```

#### 7. Update after code changes

```bash
doctl apps update <app-id> --spec .do/app.yaml
```

Or simply push to `main` — the GitHub Actions workflow triggers an automatic redeploy.

---

### Option B — Droplet (Self-hosted)

Estimated cost: **~$6/month** (1 vCPU / 1 GB RAM Droplet).

#### 1. Create a Droplet

In the DigitalOcean control panel:
- Image: **Ubuntu 22.04 LTS**
- Size: **Basic · Regular · $6/mo** (1 vCPU, 1 GB RAM)
- Authentication: SSH key (recommended)

#### 2. Run the bootstrap script

```bash
# SSH into the droplet
ssh root@<droplet-ip>

# Set your repo URL (or fork this repo first)
export REPO_URL="https://github.com/YOUR_GITHUB_USERNAME/sentiment-app.git"

# Optionally set a domain name
export DOMAIN="sentiment.example.com"

# Run setup
curl -fsSL https://raw.githubusercontent.com/YOUR_GITHUB_USERNAME/sentiment-app/main/setup.sh | bash
```

The script will:
1. Update system packages
2. Install Docker + Docker Compose
3. Configure UFW firewall (ports 22, 80, 443)
4. Clone the repository
5. Create `.env` files from examples
6. Install nginx as a reverse proxy
7. Build and start both containers

#### 3. (Optional) Enable HTTPS with Let's Encrypt

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d your-domain.com
```

---

## Cost Summary

| Approach             | Resource              | Est. Monthly Cost |
|----------------------|-----------------------|-------------------|
| App Platform (A)     | 2 × basic-xxs         | ~$10              |
| Droplet (B)          | 1 × Basic 1GB Droplet | ~$6               |
| Droplet + Managed DB | Droplet + DB cluster  | ~$21+             |

> **Note:** App Platform charges for outbound bandwidth over 1 TB/mo. For typical usage this won't apply.

---

## Project Structure

```
sentiment-app/
├── backend/
│   ├── main.py              # FastAPI app + routes
│   ├── model.py             # VADER sentiment logic
│   ├── requirements.txt     # Python dependencies
│   ├── Dockerfile           # Multi-stage build
│   └── .env.example         # Env var template
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   ├── main.jsx         # React entry point
│   │   └── index.css        # Tailwind imports
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── nginx.conf           # nginx SPA config
│   ├── Dockerfile           # Multi-stage build
│   └── .env.example
├── .do/
│   └── app.yaml             # DO App Platform spec
├── .github/
│   └── workflows/
│       └── deploy.yml       # CI/CD pipeline
├── docker-compose.yml       # Local orchestration
├── setup.sh                 # Droplet bootstrap script
└── README.md
```

---

## License

MIT
