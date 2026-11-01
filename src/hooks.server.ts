import { base } from '$app/paths';
import type { Handle } from '@sveltejs/kit';

// Search engines are pointed at the copy on solvey.in. Only the editor gets
// the link: the view and embed pages are not indexed.
const canonical = '<link rel="canonical" href="https://solvey.in/tools/diagram-editor/" />';
const canonicalPages = new Set(['', '/edit']);

export const handle: Handle = ({ event, resolve }) => {
  const page = event.url.pathname.slice(base.length).replace(/\/$/, '');
  if (!canonicalPages.has(page)) {
    return resolve(event);
  }
  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('</head>', `${canonical}\n  </head>`)
  });
};
