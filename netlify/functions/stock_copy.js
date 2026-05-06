export async function handler() {
  try {
    const url =
      "https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_2330.tw|tse_2317.tw|tse_2454.tw&json=1&delay=0"

    const res = await fetch(url)
    const data = await res.json()

    const stocks = data.msgArray.map(s => ({
      symbol: s.c,       // 股票代號
      name: s.n,         // 名稱
      price: Number(s.z) || Number(s.y), // 成交價（z=現價, y=昨收 fallback）
      open: Number(s.o),
      high: Number(s.h),
      low: Number(s.l),
      prev: Number(s.y),
      change: (Number(s.z) - Number(s.y)) || 0
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