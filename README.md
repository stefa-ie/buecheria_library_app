# buecheria_library_app

## Backend Setup

The backend requires a virtual environment because macOS uses an externally-managed Python environment.

### Running the Backend

**Option 1: Use uvicorn directly (Recommended)**

Activate the environment once, then use `uvicorn` directly:

```bash
cd backend
source activate    # or: . activate
uvicorn app:app --reload
```

The `activate` script automatically:
- ✅ Creates venv if it doesn't exist
- ✅ Detects and fixes Python 3.14 issues
- ✅ Installs dependencies if missing
- ✅ Activates the virtual environment

After sourcing `activate`, you can use `uvicorn` directly!

**Option 2: Use the start script**

```bash
cd backend
./start.sh
```

This automatically handles setup and starts the server.

### Alternative: Manual Setup (if needed)

If you prefer to set up manually:

```bash
cd backend
python3.12 -m venv venv  # or python3.13
source venv/bin/activate
pip install --upgrade pip
pip install -r ../requirements.txt
python -m uvicorn app:app --reload
```

**Note:** After sourcing `activate`, you can use `uvicorn` directly (no need for `python -m uvicorn`) because the venv is activated and `uvicorn` will use the correct Python.

