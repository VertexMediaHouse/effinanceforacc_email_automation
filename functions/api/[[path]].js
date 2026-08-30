// functions/api/[[path]].js
export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);

  const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  const targetUrl = url.searchParams.get('url');
  if (!targetUrl) {
    return new Response('Missing url parameter', { status: 400, headers: CORS });
  }

  try {
    const upstream = await fetch(targetUrl, { redirect: 'follow' });
    const text = await upstream.text();
    return new Response(text, {
      status: 200,
      headers: { ...CORS, 'Content-Type': 'text/plain' },
    });
  } catch (err) {
    return new Response(err.message, { status: 500, headers: CORS });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}