export async function handler() {
  const symbols = [
    "TM",
    "SKHY",
    "MU",
    "GOOGL",
    "IBM",
    "MCD",
    "NFLX",
    "BABA",
    "NVDA",
    "KO",
    "F",
    "HMC",
    "CARR",
    "LXRX",
    "GGR",
    "AAPL",
  ];

  const prices = {};

  for (const symbol of symbols) {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`;

    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Accept": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      const result = data.chart?.result?.[0];

      prices[symbol] = result?.meta?.regularMarketPrice ?? null;
    } catch (err) {
      console.error(`${symbol}:`, err.message);
      prices[symbol] = null;
    }
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(prices),
  };
}