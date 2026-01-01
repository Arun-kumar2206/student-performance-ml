# Student Performance Prediction (End-to-End ML)

Live app: https://student-performance-ml-one.vercel.app/

This project is an end-to-end machine learning application:

- Frontend: React (Vercel)
- Backend: FastAPI (Render / local)
- Model: scikit-learn pipeline (RandomForestRegressor) with preprocessing

## Quick Start

### Prerequisites

- Python 3.10+
- Node.js 18+
- pip

### Backend (FastAPI)

1. cd backend
2. python -m venv .venv && .\.venv\Scripts\activate
3. pip install fastapi uvicorn scikit-learn pandas numpy joblib
   - If you have requirements.txt: pip install -r requirements.txt
4. uvicorn api.main:app --reload
   - Local URL: http://127.0.0.1:8000
   - Health: GET /

Model path is resolved dynamically in `backend/api/main.py`:

- backend/model/student_model.pkl

### Frontend (React)

1. cd frontend
2. npm install
3. npm run dev
4. Open http://localhost:5173

By default, the frontend posts to the deployed backend:

- frontend/src/services/api.js → API_URL = https://student-performance-api-14pb.onrender.com/predict
  To use local backend, temporarily set:
- API_URL = http://127.0.0.1:8000/predict

## Training the Model

Data file: backend/data/students.csv  
Notebook: backend/src/train.ipynb

Steps:

1. Open the notebook in Jupyter or VS Code.
2. Run cells sequentially (Cells 1 → N).
3. The pipeline trains and saves the model to `../model/student_model.pkl`.
4. Ensure the saved model exists at `backend/model/student_model.pkl` before starting the API.

Preprocessing code: backend/src/preprocess.py

- Numerical: imputation (median) + scaling
- Categorical: imputation (most_frequent) + one-hot encoding
