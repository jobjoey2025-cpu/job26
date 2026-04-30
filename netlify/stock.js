export async function handler() {
  try {
    const symbols = ['2330.TW', '2317.TW', '2454.TW']

    const res = await fetch(
      `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols.join(',')}`
    )

    const data = await res.json()

    const stocks = data.quoteResponse.result.map(s => ({
      symbol: s.symbol,
      name: s.shortName,
      price: s.regularMarketPrice,
      change: s.regularMarketChange,
      percent: s.regularMarketChangePercent
    }))

    return {
      statusCode: 200,
      body: JSON.stringify(stocks)
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    }
  }
}