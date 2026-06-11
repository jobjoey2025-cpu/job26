exports.handler = async () => {
  const symbols = ["DKILY","CARR","MU","BABA","NFLX","GGR","TM","GOOGL","NVDA","F","HMC","MCD","KO","LXRX","AAPL", ];

  const prices = {};

  for (const symbol of symbols) {
    const url =
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`;

    const res = await fetch(url);
    const data = await res.json();

    const result = data.chart?.result?.[0];

    if (!result) {
      prices[symbol] = null;
      continue;
    }

    prices[symbol] =
      result.meta?.regularMarketPrice ?? null;
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(prices)
  };
};