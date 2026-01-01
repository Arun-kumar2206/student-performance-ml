const API_URL = "http://127.0.0.1:8000/predict";

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
