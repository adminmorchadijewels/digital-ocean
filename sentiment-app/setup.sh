#!/usr/bin/env bash
# setup.sh — Bootstrap a DigitalOcean Ubuntu 22.04 Droplet for the Sentiment App
# Run as root (or with sudo) on a fresh droplet.
#
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/YOUR/REPO/main/setup.sh | sudo bash

set -euo pipefail

# ── Configuration ─────────────────────────────────────────────────────────────
REPO_URL="${REPO_URL:-https://github.com/YOUR_GITHUB_USERNAME/sentiment-app.git}"
APP_DIR="/opt/sentiment-app"
DOMAIN="${DOMAIN:-}"   # optional: set to your domain to enable nginx vhost

log() { echo -e "\033[1;34m[setup]\033[0m $*"; }
warn() { echo -e "\033[1;33m[warn]\033[0m $*"; }

# ── 1. System update ──────────────────────────────────────────────────────────
log "Updating system packages…"
apt-get update -qq
apt-get upgrade -y -qq

# ── 2. Install Docker ─────────────────────────────────────────────────────────
if ! command -v docker &>/dev/null; then
  log "Installing Docker…"
  curl -fsSL https://get.docker.com | sh
  systemctl enable docker
  systemctl start docker
else
  log "Docker already installed: $(docker --version)"
fi

# ── 3. Install Docker Compose plugin ─────────────────────────────────────────
if ! docker compose version &>/dev/null; then
  log "Installing Docker Compose plugin…"
  apt-get install -y -qq docker-compose-plugin
else
  log "Docker Compose already installed: $(docker compose version)"
fi

# ── 4. UFW firewall ───────────────────────────────────────────────────────────
log "Configuring firewall…"
apt-get install -y -qq ufw
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw --force enable
log "Firewall status:"
ufw status numbered

# ── 5. Clone the repository ───────────────────────────────────────────────────
log "Cloning repository to ${APP_DIR}…"
if [ -d "$APP_DIR" ]; then
  warn "Directory exists — pulling latest changes instead."
  git -C "$APP_DIR" pull
else
  git clone "$REPO_URL" "$APP_DIR"
fi
cd "$APP_DIR"

# ── 6. Create .env files ──────────────────────────────────────────────────────
log "Creating environment files…"

# Backend
if [ ! -f backend/.env ]; then
  cp backend/.env.example backend/.env
  warn "Created backend/.env — review and edit as needed."
fi

# Frontend
if [ ! -f frontend/.env ]; then
  cp frontend/.env.example frontend/.env
  warn "Created frontend/.env — review and edit as needed."
fi

# ── 7. Install nginx as reverse proxy ────────────────────────────────────────
log "Installing nginx…"
apt-get install -y -qq nginx

# Write nginx config
NGINX_CONF="/etc/nginx/sites-available/sentiment-app"
cat > "$NGINX_CONF" <<NGINX
server {
    listen 80;
    server_name ${DOMAIN:-_};

    # Frontend (served by Docker on port 3000)
    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Host \$host;
        proxy_set_header   X-Real-IP \$remote_addr;
        proxy_set_header   X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto \$scheme;
    }

    # Backend API (served by Docker on port 8000)
    location /api/ {
        rewrite            ^/api/(.*) /\$1 break;
        proxy_pass         http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header   Host \$host;
        proxy_set_header   X-Real-IP \$remote_addr;
        proxy_set_header   X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto \$scheme;
    }
}
NGINX

ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/sentiment-app
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# ── 8. Launch the app ─────────────────────────────────────────────────────────
log "Building and starting containers (this may take a few minutes)…"
cd "$APP_DIR"
docker compose pull --ignore-pull-failures || true
docker compose up -d --build

log "Waiting for containers to become healthy…"
sleep 10
docker compose ps

log ""
log "✅ Deployment complete!"
log "   Frontend → http://${DOMAIN:-$(curl -s ifconfig.me)}"
log "   API docs → http://${DOMAIN:-$(curl -s ifconfig.me)}/api/docs"
log ""
log "Useful commands:"
log "  docker compose logs -f          # follow logs"
log "  docker compose restart api      # restart backend"
log "  docker compose down && docker compose up -d --build  # full redeploy"
