"""
FastAPI backend for the Sentiment Analyzer application.

Endpoints:
  GET  /health   — liveness check
  POST /analyze  — analyze sentiment of submitted text
"""

import os
import time
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from model import analyze_sentiment

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s — %(message)s",
)
logger = logging.getLogger("sentiment-api")

# ---------------------------------------------------------------------------
# App startup / shutdown
# ---------------------------------------------------------------------------
@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Sentiment API starting up…")
    # Warm up the VADER analyzer (imported at module level in model.py)
    sample = analyze_sentiment("Hello world")
    logger.info("Model warm-up result: %s", sample)
    yield
    logger.info("Sentiment API shutting down…")


app = FastAPI(
    title="Sentiment Analyzer API",
    description="Lightweight sentiment analysis powered by VADER",
    version="1.0.0",
    lifespan=lifespan,
)

# ---------------------------------------------------------------------------
# CORS — allow all origins in dev; tighten in production via env var
# ---------------------------------------------------------------------------
allowed_origins_raw = os.getenv("ALLOWED_ORIGINS", "*")
allowed_origins = (
    ["*"] if allowed_origins_raw == "*" else allowed_origins_raw.split(",")
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Schemas
# ---------------------------------------------------------------------------
class AnalyzeRequest(BaseModel):
    text: str = Field(
        ...,
        min_length=1,
        max_length=5000,
        description="Text to analyze (1–5000 characters)",
        examples=["I absolutely love this product!"],
    )


class SentimentDetails(BaseModel):
    positive: float
    negative: float
    neutral: float


class AnalyzeResponse(BaseModel):
    label: str = Field(..., description="POSITIVE | NEGATIVE | NEUTRAL")
    score: float = Field(..., description="Confidence score 0.0–1.0")
    compound: float = Field(..., description="Raw VADER compound score -1.0–1.0")
    details: SentimentDetails
    processing_time_ms: float


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------
@app.get("/health", tags=["ops"])
async def health():
    """Liveness probe — always returns 200 if the process is running."""
    return {"status": "ok", "service": "sentiment-api"}


@app.post("/analyze", response_model=AnalyzeResponse, tags=["sentiment"])
async def analyze(request: AnalyzeRequest):
    """
    Analyze the sentiment of the provided text.

    - **text**: The string to evaluate (max 5000 chars)

    Returns the predicted **label** (POSITIVE / NEGATIVE / NEUTRAL),
    a **score** (confidence 0–1), and detailed per-class probabilities.
    """
    if not request.text.strip():
        raise HTTPException(
            status_code=422, detail="text must contain at least one non-whitespace character"
        )

    t0 = time.perf_counter()
    result = analyze_sentiment(request.text)
    elapsed_ms = round((time.perf_counter() - t0) * 1000, 2)

    logger.info(
        "Analyzed %d chars → %s (score=%.3f) in %.1f ms",
        len(request.text),
        result["label"],
        result["score"],
        elapsed_ms,
    )

    return AnalyzeResponse(
        label=result["label"],
        score=result["score"],
        compound=result["compound"],
        details=SentimentDetails(**result["details"]),
        processing_time_ms=elapsed_ms,
    )
