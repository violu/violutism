export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const username = url.searchParams.get('username');
  const limit = url.searchParams.get('limit') || 8;

  if (!username) {
    return new Response(JSON.stringify({ error: 'Missing username' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const apiKey = context.env.LASTFM_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const lastfmUrl = new URL('https://ws.audioscrobbler.com/2.0/');
  lastfmUrl.searchParams.set('method', 'user.getrecenttracks');
  lastfmUrl.searchParams.set('user', username);
  lastfmUrl.searchParams.set('api_key', apiKey);
  lastfmUrl.searchParams.set('format', 'json');
  lastfmUrl.searchParams.set('limit', limit);
  lastfmUrl.searchParams.set('extended', 0);

  try {
    const response = await fetch(lastfmUrl.toString());
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
