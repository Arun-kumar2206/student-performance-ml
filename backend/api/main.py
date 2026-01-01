from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
import sqlite3
from fastapi.middleware.cors import CORSMiddleware
import os
import time
from monitoring.logger import init_db, log_prediction, DB_PATH

init_db()

app = FastAPI(title="Student Performance Prediction API")

# Allow CORS from local dev frontends
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev; restrict to your frontend origin if desired
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "model", "student_model.pkl")

model = joblib.load(MODEL_PATH)


class StudentInput(BaseModel):
    Hours_Studied: float
    Attendance: float
    Sleep_Hours: float
    Previous_Scores: float
    Tutoring_Sessions: int
    Physical_Activity: float
    Distance_from_Home: str

    Parental_Involvement: str
    Access_to_Resources: str
    Extracurricular_Activities: str
    Motivation_Level: str
    Internet_Access: str
    Family_Income: str
    Teacher_Quality: str
    School_Type: str
    Peer_Influence: str
    Learning_Disabilities: str
    Parental_Education_Level: str
    Gender: str


@app.get("/")
def home():
    return {"message": "Student Performance Prediction API is running"}


@app.post("/predict")
def predict(data: StudentInput):
    input_df = pd.DataFrame([data.dict()])

    start = time.time()

    prediction = model.predict(input_df)[0]

    latency = (time.time() - start) * 1000

    log_prediction(
        input_data=data.dict(),
        prediction=float(prediction),
        latency_ms=latency
    )

    return {
        "predicted_exam_score": round(float(prediction), 2)
    }


@app.get("/monitoring/summary")
def monitoring_summary():
    try:
        conn = sqlite3.connect(DB_PATH)
        df = pd.read_sql("SELECT * FROM predictions", conn)
        conn.close()
    except Exception:
        return {"message": "No data yet"}

    if df.empty:
        return {"message": "No data yet"}

    return {
        "total_predictions": len(df),
        "avg_prediction": round(df["prediction"].mean(), 2),
        "avg_latency_ms": round(df["latency_ms"].mean(), 2),
        "max_latency_ms": round(df["latency_ms"].max(), 2)
    }
