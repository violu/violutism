import { onRequest as lastfmHandler } from './functions/lastfm.js';

export default {
  async fetch(request, env, context) {
    const url = new URL(request.url);
    
    // Route /api/lastfm to lastfm handler
    if (url.pathname.startsWith('/api/lastfm')) {
      return lastfmHandler({ request, env }, context);
    }
    
    // Default: return 404
    return new Response('Not Found', { status: 404 });
  }
};
