const API_BASE_URL =
  "http://127.0.0.1:8000";


export async function getLatestTelemetry() {

  const response = await fetch(
    `${API_BASE_URL}/telemetry`
  );

  if (!response.ok) {
    throw new Error(
      `Telemetry request failed: ${response.status}`
    );
  }

  return response.json();
}


export async function getLatestAIAnalysis() {

  const response = await fetch(
    `${API_BASE_URL}/ai-analysis`
  );

  if (!response.ok) {
    throw new Error(
      `AI analysis request failed: ${response.status}`
    );
  }

  return response.json();
}