
from fastapi import FastAPI

app = FastAPI(title="Visual Learning Platform API")


@app.get("/")
def home():
    return {
        "message": "Visual Learning Platform API is running"
    }


@app.get("/api/health")
def health():
    return {"status": "healthy"}
