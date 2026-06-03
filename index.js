import { onRequest as lastfmHandler } from './functions/lastfm.js';

export default {
  async fetch(request, env, context) {
    const url = new URL(request.url);
    
    // Route /api/lastfm to lastfm handler
    if (url.pathname.startsWith('/api/lastfm')) {
      return lastfmHandler({ request, env }, context);
    }
    
    // For all other requests, try to serve static files
    // This is handled by Cloudflare Pages automatically
    return env.ASSETS.fetch(request);
  }
};
