export async function handler() {
  try {

    // 股票代號 array
    const symbols = ["2408","3066.TWO","2330","2498","2207","1504","3661","00652","2412","3037","2308","6192","2454","2881","2002", "2317","1907",]

    // 組成 ex_ch 字串
    const ex_ch = symbols.map(s => `tse_${s}.tw`).join("|")

    // 最終 URL
    const url = `https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=${ex_ch}&json=1&delay=0`


    // const url =
    //   "https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_2330.tw|tse_2317.tw|tse_2454.tw&json=1&delay=0"




    const res = await fetch(url)
    const data = await res.json()

    const stocks = data.msgArray.map(s => {
      // 🔹 成交價（有時候會是 "-"）
      const price = Number(s.z) || Number(s.y) || 0
      const prev = Number(s.y) || 0

      // 🔹 漲跌
      const change = price - prev

      // 🔹 漲幅 %
      const percent = prev ? (change / prev) * 100 : 0

      // 🔹 時間（台股格式 HH:MM:SS）
      const timeRaw = s.t // e.g. "13:30:00"
      const time = timeRaw
        ? `${new Date().toLocaleDateString('zh-TW')} ${timeRaw}`
        : null

      return {
        symbol: s.c,
        name: s.n,

        price,
        open: Number(s.o) || 0,
        high: Number(s.h) || 0,
        low: Number(s.l) || 0,
        prev,

        change,
        percent,

        time // ✅ 新增
      }
    })

    return {
      statusCode: 200,
      body: JSON.stringify(stocks)
    }

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }
}