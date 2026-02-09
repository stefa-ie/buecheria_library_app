# 📚 Bücheria Library App

A full-stack library management system for Bücheria — a feminist and queer community library in Hamburg. Features a public-facing website with book browsing and contact form, plus a protected admin dashboard for managing books, authors, members, and loans. Built with React + Vite frontend and FastAPI backend.

## ✨ Features

- **Public Website**: Home, Books, Events, About Us, and Contact pages
- **Admin Dashboard**: Overview with statistics for books, authors, members, and loans
- **CRUD Operations**: Full management for books, authors, members, and loans
- **JWT Authentication**: Secure login system with role-based access
- **Contact Form**: EmailJS integration with auto-reply functionality
- **Modern UI**: Tailwind CSS with dark mode support and responsive design
- **SQLite Database**: Lightweight, file-based data storage

## 🚀 Getting Started

### Backend Setup

Navigate to the backend folder and activate the environment:

```bash
cd backend
source activate    # or: . activate
uvicorn app:app --reload
```

The `activate` script automatically:
- Creates venv if it doesn't exist
- Detects and fixes Python version issues
- Installs dependencies if missing
- Activates the virtual environment

**Alternative: Manual Setup**

```bash
cd backend
python3.12 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --reload
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 🗂️ Project Structure

```
├── backend/
│   ├── app.py              # FastAPI entry point, CORS, routers
│   ├── auth.py             # JWT authentication logic
│   ├── database/           # SQLite database and connection
│   ├── models/             # SQLAlchemy models (book, author, member, loan)
│   ├── routers/            # API endpoints for each resource
│   ├── schemas/            # Pydantic validation schemas
│   └── requirements.txt    # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── api/            # API client functions
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── App.jsx         # Router and layout setup
│   ├── tailwind.config.js  # Tailwind configuration
│   └── vite.config.js      # Vite configuration
│
└── README.md
```

## 🎮 How to Use

### Public Area
1. Visit the **Home** page to see library info and location
2. Browse **Bücher** (Books) to explore the collection
3. Check **Veranstaltungen** (Events) for upcoming activities
4. Learn more on the **Über Uns** (About Us) page
5. Send a message via the **Kontakt** (Contact) form

### Admin Area
1. Click **Login** and enter your credentials
2. View the **Dashboard** for library statistics
3. Manage **Books**, **Authors**, **Members**, and **Loans** through the sidebar
4. Add, edit, or delete records as needed

## 🛠️ Customization

- **API URL**: Configure in `frontend/.env` with `VITE_API_URL`
- **EmailJS**: Set up contact form credentials in `frontend/.env`
- **Styling**: Modify `tailwind.config.js` or component styles
- **Database**: SQLite file located at `backend/database/buecheria.db`

## 🧰 Tech Stack

### Frontend
- React 19
- Vite 7
- React Router DOM
- Tailwind CSS 4
- Lucide React (icons)
- EmailJS (contact form)

### Backend
- FastAPI
- SQLAlchemy
- SQLite
- PyJWT / python-jose (authentication)
- Pydantic (validation)
- Uvicorn (ASGI server)

## 🌐 Deployment

The app is configured for deployment on Vercel (frontend) and Render (backend):

- `vercel.json` — Frontend deployment config
- `render.yaml` — Backend deployment config

## 📍 Location

Bücheria — Feministische und queere Stadtteilbibliothek  
Vogelhüttendeich 30, 21107 Hamburg
