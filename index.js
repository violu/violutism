import { onRequest as lastfmHandler } from './functions/lastfm.js';

export default {
  async fetch(request, env, context) {
    const url = new URL(request.url);
    
    // Route /api/lastfm to lastfm handler
    if (url.pathname.startsWith('/api/lastfm')) {
      return lastfmHandler({ request, env }, context);
    }
    
    // Should not reach here due to _routes.json routing
    return new Response('Not Found', { status: 404 });
  }
};
