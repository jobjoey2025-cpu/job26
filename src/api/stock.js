import axios from "axios";

// Railway Backend URL
const API_BASE =
  // "https://your-app.up.railway.app";
"https://web-production-b229a.up.railway.app";


// 建立 axios instance
const api = axios.create({
  baseURL: API_BASE,
  // timeout: 60000,
  timeout: 600000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * 股票分析
 * @param {string} stockId
 * @returns {Promise<Object>}
 */
export async function analyzeStock(stockId) {
  try {
    const response = await api.get(
      `/analyze/${stockId}`
    );

    return response.data;

  } catch (error) {

    console.error(
      "analyzeStock error:",
      error
    );

    return {
      success: false,
      error:
        error.response?.data?.error ||
        error.message ||
        "API Error",
    };
  }
}

/**
 * 健康檢查
 */
export async function healthCheck() {

  try {

    const response = await api.get("/");

    return response.data;

  } catch (error) {

    return {
      success: false,
      error: error.message,
    };
  }
}