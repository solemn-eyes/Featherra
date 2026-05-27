# Featherra Full-Stack Poultry Farm Web Application

Welcome to **Featherra**, a premium, user-friendly landing page and catalog website for an ethical, sustainable poultry farm. 

This project is built using a modern full-stack architecture:
*   **Frontend**: React.js (compiled with Vite for high performance and rapid development).
*   **Backend**: Django + Django REST Framework (DRF) creating a RESTful API.
*   **Database**: MySQL for robust relational data storage.
*   **Design & Theme**: A cozy "warm dark" ecological theme (deep forest charcoal, glowing golds, terracotta orange, and warm off-whites) styled entirely with high-performance **Vanilla CSS**.

---

## Project Directory Layout

```
featherra/
├── .venv/                    # Isolated Python virtual environment
├── backend/                  # Django REST API Backend
│   ├── requirements.txt      # Python dependencies list
│   ├── .env                  # Environment secrets (MySQL database credentials)
│   ├── .env.example          # Example backend environment variables
│   ├── manage.py             # Administrative utility
│   ├── featherra/            # Core settings & project routes
│   └── farm/                 # Farm App (Service, Product, Booking, Contact models)
└── frontend/                 # React.js SPA Frontend (Vite)
    ├── package.json          # Node dependencies & npm script runs
    ├── vite.config.js        # Vite configurations
    ├── index.html            # Main HTML entry point (SEO metadata & Google Fonts)
    └── src/
        ├── main.jsx          # Mount wrapper
        ├── App.jsx           # App orchestrator (API fetches, modals state coordinators)
        ├── index.css         # Styling system & global CSS variables
        └── components/       # Modular UI components (Navbar, Hero, Services, Products, etc.)
```

---

## Prerequisites & Installation

Ensure you have **Python 3.12+** and **Node.js** installed on your system.

### 1. Backend Setup
1. Open your terminal in the project root folder.
2. Initialize and activate the virtual environment:
   ```powershell
   python -m venv .venv
   .\.venv\Scripts\activate
   ```
3. Install dependencies:
   ```powershell
   pip install -r backend/requirements.txt
   ```
4. Create `backend/.env` from the template:
   ```powershell
   copy backend/.env.example backend/.env
   ```
5. Create your MySQL database (e.g. named `featherra`) and update `backend/.env` with your local MySQL credentials (`DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`).
   > **Note**: If you omit `DB_NAME` or leave it empty, the backend automatically falls back to a local `db.sqlite3` file for quick local setup and tests.
6. Apply migrations:
   ```powershell
   python backend/manage.py makemigrations
   python backend/manage.py migrate
   ```

### 2. Frontend Setup
1. In another terminal panel, navigate to the `frontend` folder:
   ```powershell
   cd frontend
   ```
2. Install Node packages:
   ```powershell
   npm install
   ```

---

## Running the Application Locally

To run the application, launch both the Django API server and the React dev server simultaneously.

### Start the Backend Server (Django)
Activate the environment and run:
```powershell
python backend/manage.py runserver
```
The API will run at `http://127.0.0.1:8000/`.
> **Developer Experience Bonus**: The Django REST API includes **automatic database seeding**. Upon the very first API request, if the database is empty, the backend will auto-populate itself with Featherra's default services and organic products so the frontend displays complete content immediately!

### Backend API Endpoints
All API routes are served under `/api/`:

- `GET /api/services/`
- `GET /api/products/`
- `GET,POST /api/bookings/`
- `GET,POST /api/contacts/`

Quick endpoint checks (from project root):
```powershell
curl http://127.0.0.1:8000/api/services/
curl http://127.0.0.1:8000/api/products/
```

### Start the Frontend Server (Vite)
Navigate to the `frontend` folder and run:
```powershell
npm run dev
```
The React frontend will boot at `http://localhost:3000/`. Opening this address in your browser shows the fully responsive landing page connected to your Django API. If the Django server is offline, the React app automatically falls back to beautiful mock data panels.

---

## Running Automated Tests

Testing scripts have been prepared to check both the Django models/views and the React components.

### 1. Django Backend Unit Tests
To run unit tests verifying Django REST ViewSets, database integrity, future date booking rules, and form submission validators, run:
```powershell
python backend/manage.py test farm
```

Backend health checks:
```powershell
python backend/manage.py check
python backend/manage.py test farm
```

### 2. React Frontend Testing
You can manually audit responsive views and interactive transitions using your browser developer panels on port `3000`, or execute automated checks using Vitest.
