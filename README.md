# Featherra Full-Stack Poultry Farm Web Application

Welcome to **Featherra**, a premium, user-friendly landing page and catalog website for an ethical, sustainable poultry farm.

This project is built using a modern full-stack architecture:

- **Frontend**: React.js (Vite)
- **Backend**: Django + Django REST Framework (DRF)
- **Database**: MySQL in production; SQLite fallback for quick local setup
- **Design**: Warm dark ecological theme with Vanilla CSS

---

## Project Directory Layout

```
featherra/
├── .venv/                    # Python virtual environment
├── backend/                  # Django REST API
│   ├── requirements.txt
│   ├── .env                  # Secrets (not committed)
│   ├── .env.example
│   ├── manage.py
│   ├── featherra/            # Project settings & URLs
│   └── farm/                 # Models, API views, tests
└── frontend/                 # React SPA (Vite)
    ├── package.json
    ├── .env.development      # API URL for local dev
    ├── .env.production       # API URL for production build
    └── src/
```

---

## Prerequisites

- **Python 3.12+**
- **Node.js 18+** and npm
- **MySQL** (optional for local dev — SQLite is used if `DB_NAME` is empty)

---

## First-Time Setup

Run these commands once from the **project root** (`Featherra/`).

### 1. Python virtual environment & backend dependencies

```powershell
python -m venv .venv
.\.venv\Scripts\activate
pip install -r backend/requirements.txt
```

### 2. Environment file

```powershell
copy backend\.env.example backend\.env
```

Edit `backend/.env`:

- For **quick local dev**, leave `DB_NAME` empty (SQLite at `backend/db.sqlite3` is used automatically).
- For **MySQL**, create a database named `featherra` and set `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`.

### 3. Database migrations

```powershell
python backend/manage.py migrate
```

### 4. Frontend dependencies

```powershell
cd frontend
npm install
cd ..
```

Product and service photos live in `frontend/public/images/` and are mapped by `image_name` in the API (see `frontend/src/images.js`).

---

## Running the Project (Development)

You need **two terminals**, both with the virtual environment activated.

### Terminal 1 — Backend (Django API)

From the project root:

```powershell
.\.venv\Scripts\activate
python backend/manage.py runserver 8000
```

- API base URL: **http://127.0.0.1:8000/**
- On the first API request, the database is **auto-seeded** with default services and products if empty.

### Terminal 2 — Frontend (Vite dev server)

```powershell
cd frontend
npm run dev
```

- App URL: **http://localhost:3000/**
- The frontend reads `frontend/.env.development` and calls the API at `http://127.0.0.1:8000`.
- If the backend is offline, the UI falls back to built-in mock data.

### Verify everything is working

```powershell
curl http://127.0.0.1:8000/api/services/
curl http://127.0.0.1:8000/api/products/
```

Open **http://localhost:3000/** in your browser. Services and products should load from the API.

### API endpoints

| Method | Endpoint |
|--------|----------|
| GET | `/api/services/` |
| GET | `/api/products/` |
| GET, POST | `/api/bookings/` |
| GET, POST | `/api/contacts/` |

---

## Tests & Health Checks

```powershell
.\.venv\Scripts\activate
python backend/manage.py check
python backend/manage.py test farm
```

```powershell
cd frontend
npm run build
```

---

## Deployment

### Production checklist

1. Set strong `SECRET_KEY` in `backend/.env`
2. Set `DEBUG=False`
3. Set `ALLOWED_HOSTS` to your domain(s), comma-separated
4. Configure MySQL (`DB_NAME`, `DB_USER`, etc.)
5. Set `CORS_ALLOW_ALL_ORIGINS=False` and `CORS_ALLOWED_ORIGINS` to your frontend URL (if API and UI are on different hosts)
6. Enable HTTPS and set `SECURE_SSL_REDIRECT=True` behind a reverse proxy

### Option A — Single server (Django serves API + built React app)

Best for a simple VPS or PaaS with one process.

**1. Build the frontend** (uses `frontend/.env.production` — API calls are same-origin):

```powershell
cd frontend
npm install
npm run build
cd ..
```

**2. Prepare the backend:**

```powershell
.\.venv\Scripts\activate
pip install -r backend/requirements.txt
python backend/manage.py migrate
python backend/manage.py collectstatic --noinput
```

**3. Set in `backend/.env`:**

```env
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
SERVE_FRONTEND=True
CORS_ALLOW_ALL_ORIGINS=False
```

**4. Run with Gunicorn:**

```powershell
cd backend
gunicorn featherra.wsgi:application --bind 0.0.0.0:8000 --workers 3
```

Visit **http://your-server:8000/** — the React app and `/api/` routes are served together.

> Put **nginx** or **Caddy** in front of Gunicorn for HTTPS and static caching in real production.

### Option B — Split hosting (recommended at scale)

- **Frontend**: Deploy `frontend/dist/` to Netlify, Vercel, S3+CloudFront, etc.
- **Backend**: Deploy Django with Gunicorn + MySQL on your server.

Set `VITE_API_BASE_URL=https://api.yourdomain.com` before `npm run build`, and add that origin to `CORS_ALLOWED_ORIGINS` in `backend/.env`.

### Pre-deploy verification (run locally)

```powershell
.\.venv\Scripts\activate
python backend/manage.py check --deploy
python backend/manage.py test farm
cd frontend
npm run build
cd ..
$env:DEBUG="False"; $env:SERVE_FRONTEND="True"; python backend/manage.py check
```

---

## Environment Variables Reference

### Backend (`backend/.env`)

| Variable | Description |
|----------|-------------|
| `SECRET_KEY` | Django secret key |
| `DEBUG` | `True` / `False` |
| `ALLOWED_HOSTS` | Comma-separated hostnames |
| `DB_*` | MySQL connection (omit `DB_NAME` for SQLite) |
| `CORS_ALLOWED_ORIGINS` | Allowed frontend origins |
| `CORS_ALLOW_ALL_ORIGINS` | `True` only for local dev |
| `SERVE_FRONTEND` | `True` to serve `frontend/dist` from Django |
| `SECURE_SSL_REDIRECT` | `True` when HTTPS is terminated upstream |

### Frontend

| File | Purpose |
|------|---------|
| `.env.development` | `VITE_API_BASE_URL=http://127.0.0.1:8000` for `npm run dev` |
| `.env.production` | Empty `VITE_API_BASE_URL` for same-origin production builds |
| `.env.example` | Template for custom setups |

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `ModuleNotFoundError: pymysql` | `pip install -r backend/requirements.txt` inside `.venv` |
| Frontend shows mock data only | Start Django on port 8000; check browser console for CORS errors |
| `Frontend build not found` with `SERVE_FRONTEND=True` | Run `npm run build` in `frontend/` |
| MySQL connection errors | Verify credentials in `backend/.env` or use SQLite by clearing `DB_NAME` |
