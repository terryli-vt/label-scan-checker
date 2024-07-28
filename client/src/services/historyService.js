// const API_URL = "https://scan-system-46b3b71881a3.herokuapp.com/api"; // Replace with your API URL
const API_URL = "http://localhost:3500";

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
