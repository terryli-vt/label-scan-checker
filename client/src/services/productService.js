// const API_URL = "http://localhost:3500";
const API_URL = "https://label-scan-checker.onrender.com";

// Function to fetch product list
export async function getProducts() {
  const response = await fetch(`${API_URL}/products`);
  const data = await response.json();
  return data;
}

// Function to post a new product
export async function postProduct(productData) {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  const data = await response.json();
  return data;
}
