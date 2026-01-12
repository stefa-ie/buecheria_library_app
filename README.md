# buecheria_library_app

## Backend Setup

The backend requires a virtual environment because macOS uses an externally-managed Python environment.

### First-time Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Run the setup script:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

   Or manually:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install --upgrade pip
   pip install -r ../requirements.txt
   ```

### Running the Backend

**Always activate the virtual environment first:**

```bash
cd backend
source venv/bin/activate
uvicorn app:app --reload
```

### Why This Error Keeps Happening

The `email-validator` error appears because:
- The code uses `EmailStr` from Pydantic (in `schemas/member.py`)
- This requires the `email-validator` package
- You're running Python without the virtual environment activated
- macOS prevents installing packages globally in system Python

**Solution:** Always activate the virtual environment before running the backend!
