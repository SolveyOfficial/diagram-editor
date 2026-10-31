import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import Icons from 'unplugin-icons/vite';
import license from 'rollup-plugin-license';
import { defineConfig } from 'vite';
import devtoolsJson from 'vite-plugin-devtools-json';

/**
 * HMR creates state inconsistencies, so we always reload the page.
 * @type {import('vite').PluginOption} PluginOption
 */
const alwaysFullReload = {
  name: 'always-full-reload',
  handleHotUpdate({ server }) {
    server.ws.send({ type: 'full-reload' });
    return [];
  }
};

// Collects the licences of every package bundled into the browser build.
// scripts/notices.js turns this into THIRD_PARTY_NOTICES.md in the output.
const thirdPartyLicences = license({
  thirdParty: {
    output: {
      file: '.svelte-kit/third-party-licences.json',
      template: (dependencies) =>
        JSON.stringify(
          dependencies.map(
            ({ licenseText, license: id, name, noticeText, repository, version }) => ({
              id,
              licenseText,
              name,
              noticeText,
              repository: typeof repository === 'string' ? repository : repository?.url,
              version
            })
          )
        )
    }
  }
});

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    tailwindcss(),
    sveltekit(),
    Icons({
      compiler: 'svelte',
      customCollections: {
        custom: FileSystemIconLoader('./static/icons')
      }
    }),
    alwaysFullReload,
    devtoolsJson(),
    !isSsrBuild && thirdPartyLicences
  ],
  envPrefix: 'MERMAID_',
  server: { port: 3000, host: true },
  preview: { port: 3000, host: true },
  // Vitest otherwise resolves Svelte's server build, where $effect is a no-op.
  resolve: process.env.VITEST ? { conditions: ['browser'] } : undefined,
  test: {
    environment: 'jsdom',
    // in-source testing
    includeSource: ['src/**/*.{js,ts,svelte}'],
    // Ignore E2E tests
    exclude: [
      'tests/**/*',
      '**/node_modules/**',
      '**/dist/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*'
    ],
    setupFiles: ['./src/tests/setup.ts'],
    coverage: {
      exclude: ['src/mocks', '.svelte-kit', 'src/**/*.test.ts'],
      reporter: ['text', 'json', 'html', 'lcov']
    }
  }
}));
