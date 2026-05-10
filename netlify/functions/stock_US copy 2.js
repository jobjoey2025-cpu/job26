exports.handler = async () => {
  const url =
    "https://query1.finance.yahoo.com/v8/finance/chart/AAPL";

  const res = await fetch(url);
  const data = await res.json();

  const price =
    data.chart.result[0].meta.regularMarketPrice;

  return {
    statusCode: 200,
    body: JSON.stringify({ price })
  };
};