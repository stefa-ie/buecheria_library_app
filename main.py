from fastapi import FastAPI
from backend_app_authors import router as authors_router
from backend_app_books import router as books_router
from backend_app_members import router as members_router

app = FastAPI(title="Buecheria API")

# Include routers
app.include_router(authors_router, prefix="/api", tags=["Authors"])
app.include_router(books_router, prefix="/api", tags=["Books"])
app.include_router(members_router, prefix="/api", tags=["Members"])
