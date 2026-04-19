import os
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from core.config_parser import load_config
from services.pdf_generator import generate_pdf

app = FastAPI(title="Portfolio API")

# Setup CORS for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

INFO_PATH = os.getenv("INFO_PATH", "../info.yaml")
PDF_OUTPUT_PATH = "/tmp/resume.pdf"
TEMPLATE_DIR = os.path.join(os.path.dirname(__file__), "templates")

@app.get("/api/portfolio")
def get_portfolio():
    try:
        config = load_config(INFO_PATH)
        return config
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading config: {str(e)}")

@app.get("/api/resume/download")
def download_resume():
    try:
        config = load_config(INFO_PATH)
        generate_pdf(config, TEMPLATE_DIR, PDF_OUTPUT_PATH)
        return FileResponse(
            PDF_OUTPUT_PATH,
            media_type="application/pdf",
            filename=f"{config.base_info.name.replace(' ', '_')}_Resume.pdf"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating PDF: {str(e)}")
