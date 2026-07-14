export async function handler() {
  const pairs = [
    { pair: "USD", symbol: "USDTWD=X" },
    { pair: "JPY", symbol: "JPYTWD=X" },
    { pair: "ETH", symbol: "ETH-USD" },
    { pair: "BTC", symbol: "BTC-USD" },
    { pair: "CNY", symbol: "CNYTWD=X" },
    { pair: "EUR", symbol: "EURTWD=X" },
    { pair: "Gold", symbol: "GC=F" },
    { pair: "Silver", symbol: "SI=F" },
    { pair: "Oil", symbol: "CL=F" },
  ];

  const results = [];

  for (const item of pairs) {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${item.symbol}`;

    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      results.push({
        pair: item.pair,
        rate: data.chart?.result?.[0]?.meta?.regularMarketPrice ?? null,
      });
    } catch (err) {
      console.error(item.symbol, err);

      results.push({
        pair: item.pair,
        rate: null,
        error: err.message,
      });
    }
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(results),
  };
}