import { useState, useCallback } from "react";

// API base URL — injected at build time via Vite env variable
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// ─── Helper components ────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg
      className="animate-spin-slow h-6 w-6 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-label="Loading"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

// Map label → Tailwind colour tokens
const LABEL_CONFIG = {
  POSITIVE: {
    bg: "bg-green-50",
    border: "border-green-200",
    badge: "bg-green-100 text-green-800",
    bar: "bg-green-500",
    icon: "✓",
    iconBg: "bg-green-100 text-green-600",
    text: "text-green-700",
  },
  NEGATIVE: {
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-100 text-red-800",
    bar: "bg-red-500",
    icon: "✗",
    iconBg: "bg-red-100 text-red-600",
    text: "text-red-700",
  },
  NEUTRAL: {
    bg: "bg-gray-50",
    border: "border-gray-200",
    badge: "bg-gray-100 text-gray-700",
    bar: "bg-gray-400",
    icon: "–",
    iconBg: "bg-gray-100 text-gray-500",
    text: "text-gray-600",
  },
};

function ScoreBar({ label, value, colorClass }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-xs font-medium text-gray-600">{label}</span>
        <span className="text-xs text-gray-500">{(value * 100).toFixed(1)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div
          className={`${colorClass} h-1.5 rounded-full transition-all duration-700`}
          style={{ width: `${value * 100}%` }}
        />
      </div>
    </div>
  );
}

function ResultCard({ result }) {
  const cfg = LABEL_CONFIG[result.label] ?? LABEL_CONFIG.NEUTRAL;
  const confidencePct = Math.round(result.score * 100);

  return (
    <div
      className={`animate-slide-up rounded-2xl border-2 ${cfg.bg} ${cfg.border} p-6 space-y-4`}
    >
      {/* Header row */}
      <div className="flex items-center gap-3">
        <span
          className={`flex items-center justify-center w-10 h-10 rounded-full text-lg font-bold ${cfg.iconBg}`}
        >
          {cfg.icon}
        </span>
        <div>
          <span
            className={`inline-block px-3 py-0.5 rounded-full text-sm font-semibold tracking-wide ${cfg.badge}`}
          >
            {result.label}
          </span>
          <p className={`text-xs mt-0.5 ${cfg.text}`}>
            {confidencePct}% confidence
          </p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-xs text-gray-400">compound</p>
          <p className="text-sm font-mono font-semibold text-gray-700">
            {result.compound >= 0 ? "+" : ""}
            {result.compound.toFixed(3)}
          </p>
        </div>
      </div>

      {/* Confidence bar */}
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-xs font-medium text-gray-600">Confidence</span>
          <span className="text-xs text-gray-500">{confidencePct}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`${cfg.bar} h-2.5 rounded-full transition-all duration-700`}
            style={{ width: `${confidencePct}%` }}
          />
        </div>
      </div>

      {/* Detail scores */}
      {result.details && (
        <div className="space-y-2 pt-1 border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Breakdown
          </p>
          <ScoreBar
            label="Positive"
            value={result.details.positive}
            colorClass="bg-green-500"
          />
          <ScoreBar
            label="Negative"
            value={result.details.negative}
            colorClass="bg-red-500"
          />
          <ScoreBar
            label="Neutral"
            value={result.details.neutral}
            colorClass="bg-gray-400"
          />
        </div>
      )}

      {/* Processing time */}
      {result.processing_time_ms !== undefined && (
        <p className="text-xs text-gray-400 text-right">
          Processed in {result.processing_time_ms} ms
        </p>
      )}
    </div>
  );
}

// ─── Main app ─────────────────────────────────────────────────────────────────

export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const MAX_CHARS = 5000;
  const charCount = text.length;
  const isOverLimit = charCount > MAX_CHARS;

  const analyze = useCallback(async () => {
    if (!text.trim() || loading) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim() }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.detail ?? `HTTP ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      if (err.name === "TypeError" && err.message.includes("fetch")) {
        setError(
          "Cannot reach the API. Make sure the backend is running at " + API_URL
        );
      } else {
        setError(err.message || "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }, [text, loading]);

  // Allow Ctrl/Cmd + Enter to submit
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      analyze();
    }
  };

  const handleClear = () => {
    setText("");
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex flex-col">
      {/* Header */}
      <header className="py-8 text-center">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          Sentiment Analyzer
        </h1>
        <p className="mt-2 text-slate-500 text-sm">
          Powered by VADER · FastAPI · React
        </p>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center px-4 pb-12">
        <div className="w-full max-w-2xl space-y-5">
          {/* Input card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
            <label
              htmlFor="text-input"
              className="block text-sm font-semibold text-slate-700"
            >
              Enter text to analyze
            </label>

            <textarea
              id="text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type or paste text here… (e.g. &quot;I absolutely love this product!&quot;)"
              rows={6}
              maxLength={MAX_CHARS + 1}
              className={`w-full resize-none rounded-xl border px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                isOverLimit
                  ? "border-red-300 focus:ring-red-200"
                  : "border-slate-200 focus:ring-blue-200 focus:border-blue-400"
              }`}
              aria-describedby="char-count"
            />

            {/* Character count */}
            <div className="flex items-center justify-between">
              <span
                id="char-count"
                className={`text-xs ${
                  isOverLimit ? "text-red-500 font-semibold" : "text-slate-400"
                }`}
              >
                {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
              </span>
              <p className="text-xs text-slate-400 hidden sm:block">
                Ctrl + Enter to submit
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={analyze}
                disabled={loading || !text.trim() || isOverLimit}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                {loading ? (
                  <>
                    <Spinner />
                    Analyzing…
                  </>
                ) : (
                  "Analyze"
                )}
              </button>

              {(text || result || error) && (
                <button
                  onClick={handleClear}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 active:scale-95 transition-all"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Error state */}
          {error && (
            <div className="animate-fade-in rounded-2xl border-2 border-amber-200 bg-amber-50 p-5 flex gap-3">
              <span className="text-amber-500 text-xl">⚠</span>
              <div>
                <p className="text-sm font-semibold text-amber-800">
                  Something went wrong
                </p>
                <p className="text-sm text-amber-700 mt-0.5">{error}</p>
              </div>
            </div>
          )}

          {/* Result card */}
          {result && <ResultCard result={result} />}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-400">
        API:{" "}
        <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">
          {API_URL}
        </code>
      </footer>
    </div>
  );
}
