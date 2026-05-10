exports.handler = async () => {
  const url =
    "https://query1.finance.yahoo.com/v8/finance/chart/USDTWD=X";

  const res = await fetch(url);
  const data = await res.json();

  const result = data.chart?.result?.[0];

  const rate = result?.meta?.regularMarketPrice;

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      pair: "USDTWD",
      rate
    })
  };
};