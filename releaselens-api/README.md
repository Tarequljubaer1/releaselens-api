# ReleaseLens API

This repo is the **backend API** for ReleaseLens (ingestion + scoring + project list + next-best-actions).

## Quick start (local)

### 1) Start Postgres

```bash
docker compose up -d
```

### 2) Configure env

```bash
cp .env.example .env
```

### 3) Install deps + migrate

```bash
npm install
npx prisma generate
npx prisma migrate dev
```

### 4) Run the API

```bash
npm run start
```

API will be on `http://localhost:3000`.

Swagger:
- `http://localhost:3000/docs`

## Main endpoints

- `POST /v1/ingest` – ingest a pipeline run
- `GET /v1/projects` – list projects (includes latest pipeline result)
- `GET /v1/projects/:id/pipelines?limit=20` – list recent runs for a project
- `GET /v1/actions?limit=20` – next-best-actions (simple heuristic)

> Note: the dashboard expects the API base URL via `RELEASELENS_API_BASE_URL`.
