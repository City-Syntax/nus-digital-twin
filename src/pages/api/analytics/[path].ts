import type { APIRoute } from 'astro';

export const prerender = false;
const baseUrl = import.meta.env.PUBLIC_UMAMI_API_ENDPOINT;
const apiKey = import.meta.env.PUBLIC_UMAMI_API_KEY;
const websiteId = import.meta.env.PUBLIC_UMAMI_WEBSITE_ID;

const initialiser = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'x-umami-api-key': apiKey,
  },
};

const routeMap: Record<string, () => string> = {
  active: () => `${baseUrl}/websites/${websiteId}/active`,
  stats: () => {
    const start = new Date(0).getTime();
    const end = Date.now();
    return `${baseUrl}/websites/${websiteId}/stats?startAt=${start}&endAt=${end}`;
  },
};

export const GET: APIRoute = async ({ params }) => {
  const path = params.path;

  const buildUrl = path && routeMap[path];
  if (!buildUrl) {
    return new Response(JSON.stringify({ error: 'Invalid path' }), { status: 404 });
  }

  try {
    const res = await fetch(buildUrl(), initialiser);
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Fetch failed' }), { status: 500 });
  }
};
