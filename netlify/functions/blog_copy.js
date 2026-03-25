export async function handler() {
  const url =
    'https://9stepapps.blogspot.com/feeds/posts/default?alt=json'

  const res = await fetch(url)
  const data = await res.json()

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(data)
  }
}