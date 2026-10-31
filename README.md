# Solvey Diagram Editor

Create flowcharts, sequence diagrams, Gantt charts and more from text, and see
them update as you type. Powered by [Mermaid](https://mermaid.js.org).

## Private by design

Everything runs in your browser. Diagrams are stored only in the page URL and
your browser's local storage, and are never uploaded. The app has no analytics
or tracking and loads no third-party resources. Once loaded, it also works
offline.

## Features

- Live preview with pan and zoom, a grid and a hand-drawn ("rough") style
- Code and configuration editors with syntax highlighting and error markers
- Sample diagrams for every Mermaid diagram type
- Export to PNG or SVG, or copy the image to the clipboard
- Share a link to a diagram, or embed it in another page
- History of your recent diagrams, kept in your browser
- Light and dark themes

## Development

You need Node.js 24.16 or later and pnpm (`corepack enable pnpm`).

```sh
pnpm install        # install dependencies
pnpm dev            # development server at http://localhost:3000
pnpm lint           # Prettier and ESLint
pnpm check          # type check
pnpm vitest run     # unit tests
pnpm test:e2e       # browser tests (Playwright)
pnpm build          # production build in docs/
```

The build also writes `THIRD_PARTY_NOTICES.md`, listing every bundled package
and font with its licence. It is linked from the app menu as "Licences".

When the repository is public, every push to `main` is published to GitHub Pages.

## Licence

MIT, see LICENSE.
