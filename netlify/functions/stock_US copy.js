exports.handler = async (event) => {
  const symbol = event.queryStringParameters.symbol || "AAPL";

  const url =
    `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0"
    }
  });

  const data = await response.json();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
};