from fastapi import FastAPI
from database import Base, engine
from backend.routers import authors, books, members

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Buecheria API")


#Register routers
app.include_router(authors.router, prefix="/api", tags=["Authors"])
app.include_router(books.router, prefix="/api", tags=["Books"])
app.include_router(members.router, prefix="/api", tags=["Members"])


@app.get("/")
def home():
    return {"message": "hello"}
