import sqlite3
from datetime import datetime
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, "monitoring", "predictions.db")


def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS predictions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            input_data TEXT,
            prediction REAL,
            latency_ms REAL
        )
    """)

    conn.commit()
    conn.close()


def log_prediction(input_data, prediction, latency_ms):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO predictions (timestamp, input_data, prediction, latency_ms)
        VALUES (?, ?, ?, ?)
    """, (
        datetime.utcnow().isoformat(),
        str(input_data),
        prediction,
        latency_ms
    ))

    conn.commit()
    conn.close()
