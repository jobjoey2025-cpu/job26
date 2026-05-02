import Parser from 'rss-parser'

export async function handler() {
  try {
    const parser = new Parser()

    // const feed = await parser.parseURL(
    //   'https://news.google.com/rss/search?q=台積電&hl=zh-TW&gl=TW&ceid=TW:zh-Hant'
    // )

    const keyword = encodeURIComponent('台股')

    const url = `https://news.google.com/rss/search?q=${keyword}&hl=zh-TW&gl=TW&ceid=TW:zh-Hant`

    const feed = await parser.parseURL(url)

    return {
      statusCode: 200,
      body: JSON.stringify(feed.items || [])
    }

  } catch (err) {
    console.error('❌ error:', err)

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }
}