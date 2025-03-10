import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

export const onRequest = defineRouteMiddleware((context) => {
  const match = context.url.pathname.match(/^\/[^/]+/);
  const basePath = match ? match[0] : '';
  const { pagination } = context.locals.starlightRoute;

  context.locals.starlightRoute.sidebar = context.locals.starlightRoute.sidebar.filter((entry) => {
    if (entry.type === 'link') {
      return entry.href.startsWith(basePath);
    } else {
      return entry.entries.some((subEntry) => subEntry.type === 'link' && subEntry.href.startsWith(basePath));
    }
  });

  if (pagination.prev && !pagination.prev.href.startsWith(basePath)) {
    pagination.prev = undefined;
  }
  if (pagination.next && !pagination.next.href.startsWith(basePath)) {
    pagination.next = undefined;
  }
});
