export async function handler() {
  try {
    const res = await fetch(
      "https://9stepapps.blogspot.com/feeds/posts/default?alt=json"
    );

    const data = await res.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=600",
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch blog" }),
    };
  }
}