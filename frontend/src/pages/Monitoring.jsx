import { useEffect, useState } from "react";
import { API_BASE } from "../services/api";

export default function Monitoring() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/monitoring/summary`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load monitoring data");
        return res.json();
      })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading monitoring data</p>;
  if (!data || data.message) return <p>{data?.message || "No data available"}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>📊 Model Monitoring Dashboard</h2>
      <p>Total Predictions: {data.total_predictions}</p>
      <p>Average Prediction: {data.avg_prediction}</p>
      <p>Average Latency (ms): {data.avg_latency_ms}</p>
      <p>Max Latency (ms): {data.max_latency_ms}</p>
    </div>
  );
}
