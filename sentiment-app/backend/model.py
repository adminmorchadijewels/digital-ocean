"""
Sentiment analysis model using VADER (Valence Aware Dictionary and sEntiment Reasoner).
VADER is rule-based and optimized for social media text — fast, lightweight, no GPU needed.
"""

from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

# Initialize analyzer once at module load (thread-safe for reads)
_analyzer = SentimentIntensityAnalyzer()


def analyze_sentiment(text: str) -> dict:
    """
    Analyze the sentiment of the given text.

    Returns a dict with:
      - label: "POSITIVE", "NEGATIVE", or "NEUTRAL"
      - score: confidence score between 0.0 and 1.0
      - compound: raw VADER compound score (-1.0 to 1.0)
      - details: per-class scores (pos, neg, neu)
    """
    if not text or not text.strip():
        return {
            "label": "NEUTRAL",
            "score": 1.0,
            "compound": 0.0,
            "details": {"positive": 0.0, "negative": 0.0, "neutral": 1.0},
        }

    scores = _analyzer.polarity_scores(text)
    compound = scores["compound"]

    # VADER thresholds: >= 0.05 positive, <= -0.05 negative, else neutral
    if compound >= 0.05:
        label = "POSITIVE"
        # Normalize compound (0.05–1.0) to confidence (0.5–1.0)
        score = round(0.5 + (compound - 0.05) / 1.9, 4)
    elif compound <= -0.05:
        label = "NEGATIVE"
        score = round(0.5 + (abs(compound) - 0.05) / 1.9, 4)
    else:
        label = "NEUTRAL"
        # Confidence inversely proportional to how far compound is from 0
        score = round(1.0 - abs(compound) / 0.05 * 0.5, 4)

    # Clamp score to [0.5, 1.0]
    score = max(0.5, min(1.0, score))

    return {
        "label": label,
        "score": score,
        "compound": round(compound, 4),
        "details": {
            "positive": round(scores["pos"], 4),
            "negative": round(scores["neg"], 4),
            "neutral": round(scores["neu"], 4),
        },
    }
