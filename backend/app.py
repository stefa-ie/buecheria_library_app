from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.database import Base, engine
from routers import authors, books, members, loans, auth

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Buecheria API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#Register routers
app.include_router(auth.router, prefix="/api", tags=["Auth"])
app.include_router(authors.router, prefix="/api", tags=["Authors"])
app.include_router(books.router, prefix="/api", tags=["Books"])
app.include_router(members.router, prefix="/api", tags=["Members"])
app.include_router(loans.router, prefix="/api", tags=["Loans"])


@app.get("/")
def home():
    return {"message": "Welcome to the Library API"}

