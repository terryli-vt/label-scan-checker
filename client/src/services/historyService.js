// const API_URL = "http://localhost:3500";
const API_URL = "https://label-scan-checker.onrender.com";

// Function to fetch history scan records
export async function getHistories() {
  const response = await fetch(`${API_URL}/histories`);
  const data = await response.json();
  return data;
}

// Function to post a new scan record
export async function postHistory(historyData) {
  const response = await fetch(`${API_URL}/histories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(historyData),
  });

  const data = await response.json();
  return data;
}
