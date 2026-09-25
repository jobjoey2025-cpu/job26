import Parser from 'rss-parser'

export async function handler() {
  try {
    const parser = new Parser()

    const keyword = encodeURIComponent('台股')
    const url = `https://news.google.com/rss/search?q=${keyword}&hl=zh-TW&gl=TW&ceid=TW:zh-Hant`

    // 👉 自己 fetch（關鍵）
    const res = await fetch(url)
    const xml = await res.text()  // 強制 UTF-8

    // 👉 再給 parser
    const feed = await parser.parseString(xml)

    return {
      statusCode: 200,
      body: JSON.stringify(feed.items || [])
    }

  } catch (err) {
    console.error(err)

    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    }
  }
}