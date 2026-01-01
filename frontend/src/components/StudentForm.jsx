import { useState } from "react";
import { predictScore } from "../services/api";

export default function StudentForm() {
  const [formData, setFormData] = useState({
    Hours_Studied: 5,
    Attendance: 80,
    Sleep_Hours: 7,
    Previous_Scores: 75,
    Tutoring_Sessions: 1,
    Physical_Activity: 1,
    Distance_from_Home: "Near",

    Parental_Involvement: "Medium",
    Access_to_Resources: "Medium",
    Extracurricular_Activities: "Yes",
    Motivation_Level: "Medium",
    Internet_Access: "Yes",
    Family_Income: "Medium",
    Teacher_Quality: "Good",
    School_Type: "Public",
    Peer_Influence: "Positive",
    Learning_Disabilities: "No",
    Parental_Education_Level: "Bachelor",
    Gender: "Male",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await predictScore(formData);
      setResult(res.predicted_exam_score);
    } catch (err) {
      alert("Error predicting score");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>🎓 Student Performance Predictor</h2>

      {Object.keys(formData).map((key) => (
        <div key={key}>
          <label>{key}</label>
          <input
            name={key}
            value={formData[key]}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: 10 }}
          />
        </div>
      ))}

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Predicting..." : "Predict Score"}
      </button>

      {result && (
        <h3>📊 Predicted Exam Score: {result}</h3>
      )}
    </div>
  );
}
