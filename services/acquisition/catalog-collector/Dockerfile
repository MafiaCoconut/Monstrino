FROM ghcr.io/astral-sh/uv:latest AS uvbin

FROM python:3.13-slim AS builder

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    UV_LINK_MODE=copy \
    VIRTUAL_ENV=/opt/venv \
    PATH="/opt/venv/bin:$PATH"

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    git \
    openssh-client \
    build-essential \
    libpq-dev \
  && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /root/.ssh && chmod 700 /root/.ssh \
 && ssh-keyscan -t rsa,ecdsa,ed25519 github.com >> /root/.ssh/known_hosts

COPY --from=uvbin /uv /usr/local/bin/uv

COPY pyproject.toml uv.lock ./

RUN uv venv /opt/venv

RUN --mount=type=ssh uv sync --frozen --no-dev --active


FROM python:3.13-slim AS runtime

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app \
    VIRTUAL_ENV=/opt/venv \
    PATH="/opt/venv/bin:$PATH" \
    APP_HOST=0.0.0.0 \
    APP_PORT=8000 \
    APP_MODULE=main:app \
    APP_WORKERS=1

WORKDIR /app

RUN useradd -m -u 10001 appuser

COPY --from=builder /opt/venv /opt/venv
COPY --chown=appuser:appuser src .
USER appuser

EXPOSE 8000

CMD ["sh", "-c", "uvicorn \"$APP_MODULE\" --host \"$APP_HOST\" --port \"$APP_PORT\" --workers \"$APP_WORKERS\" --log-config infra/logging/logging_config_k8s_test.json"]
