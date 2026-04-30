export async function handler() {
  try {
    const parser = new Parser()

    const feed = await parser.parseURL(
      'https://news.google.com/rss/search?q=台股&hl=zh-TW&gl=TW&ceid=TW:zh-Hant'
    )

    console.log('items:', feed.items.length)

    return {
      statusCode: 200,
      body: JSON.stringify(feed.items)
    }
  } catch (err) {
    console.error(err)

    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    }
  }
}