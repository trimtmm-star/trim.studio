// After `vite build` (client) and `vite build --ssr` (server entry): write one
// HTML file per route with its own title, description, canonical and
// structured data, plus the rendered page text where available. Also writes
// sitemap.xml and spa.html (the untouched shell used for every other URL).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const dist = 'dist';
const { render, ROUTES, SITE, LOCAL_BUSINESS, PAGES } = await import(pathToFileURL(join('dist-ssr', 'entry-server.js')).href);

const template = readFileSync(join(dist, 'index.html'), 'utf8');
writeFileSync(join(dist, 'spa.html'), template);

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ld = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;

for (const r of ROUTES) {
  const url = SITE + (r.path === '/' ? '/' : r.path);
  const page = PAGES.find((p) => p.path === r.path);
  const data = [LOCAL_BUSINESS];
  if (page?.kind === 'article') {
    data.push({ '@context': 'https://schema.org', '@type': 'Article', headline: page.h1, description: page.description, dateModified: page.updated, author: { '@type': 'Person', name: 'Trim Tahirsylaj' }, mainEntityOfPage: url });
  }
  if (page?.kind === 'service') {
    data.push({ '@context': 'https://schema.org', '@type': 'Service', name: page.h1, description: page.description, provider: { '@type': 'ProfessionalService', name: 'ttrim.studio', url: SITE }, areaServed: 'Oost-Vlaanderen', url });
  }
  if (page?.faq) {
    data.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: page.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) });
  }

  const head = [
    `<title>${esc(r.title)}</title>`,
    `<meta name="description" content="${esc(r.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${page?.kind === 'article' ? 'article' : 'website'}" />`,
    `<meta property="og:title" content="${esc(r.title)}" />`,
    `<meta property="og:description" content="${esc(r.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITE}/work/${page?.media?.img ?? 'detailingbros'}.webp" />`,
    `<meta property="og:locale" content="nl_BE" />`,
    ...data.map(ld),
  ].join('\n    ');

  let html = template.replace(/<title>[\s\S]*?<\/title>/, head);
  const body = render(r.path);
  if (body) html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  const file = r.path === '/' ? join(dist, 'index.html') : join(dist, `${r.path.slice(1)}.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  console.log(`prerendered ${r.path}${body ? '' : ' (head only)'}`);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map((r) => `  <url><loc>${SITE}${r.path === '/' ? '/' : r.path}</loc><lastmod>${PAGES.find((p) => p.path === r.path)?.updated ?? today}</lastmod><priority>${r.priority}</priority></url>`).join('\n')}
</urlset>
`;
writeFileSync(join(dist, 'sitemap.xml'), sitemap);
console.log(`sitemap.xml: ${ROUTES.length} urls`);
