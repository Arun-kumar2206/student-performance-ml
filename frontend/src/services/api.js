export const API_BASE = "https://student-performance-api-14pb.onrender.com";

const API_URL = `${API_BASE}/predict`;

export async function predictScore(formData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Prediction failed");
  }

  return response.json();
}
