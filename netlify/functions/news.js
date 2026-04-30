// /netlify/functions/news.js
import Parser from 'rss-parser'

export async function handler() {
  const parser = new Parser()

  const feed = await parser.parseURL(
    'https://news.google.com/rss/search?q=台股'
  )

  return {
    statusCode: 200,
    body: JSON.stringify(feed.items)
  }
}