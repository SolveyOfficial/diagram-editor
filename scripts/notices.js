// Writes THIRD_PARTY_NOTICES.md into the build output from the licences
// collected during the client build (see thirdPartyLicences in vite.config.js),
// plus fonts that are only referenced from CSS.
import fs from 'node:fs';
import path from 'node:path';

const outDir = 'docs';
const collected = JSON.parse(fs.readFileSync('.svelte-kit/third-party-licences.json', 'utf8'));

const readLicenceFile = (dir) => {
  const file = fs.readdirSync(dir).find((name) => /^licen[cs]e/i.test(name));
  return file ? fs.readFileSync(path.join(dir, file), 'utf8').trim() : undefined;
};

const fonts = [
  ['@fontsource-variable/inter', 'Inter font'],
  ['@fontsource-variable/plus-jakarta-sans', 'Plus Jakarta Sans font']
].map(([pkg, title]) => {
  const dir = path.join('node_modules', pkg);
  const meta = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'));
  return {
    id: meta.license,
    licenseText: readLicenceFile(dir),
    name: title,
    version: meta.version
  };
});

const seen = new Set();
const entries = [...collected, ...fonts]
  .filter(({ name, version }) => {
    const key = `${name}@${version}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  })
  .toSorted((a, b) => a.name.localeCompare(b.name));

const missing = entries.filter((entry) => !entry.licenseText);
if (missing.length > 0) {
  throw new Error(`No licence text for: ${missing.map((e) => e.name).join(', ')}`);
}

const sections = entries.map(({ id, licenseText, name, noticeText, repository, version }) =>
  [
    `## ${name} ${version}`,
    '',
    `- Licence: ${id ?? 'see text below'}`,
    ...(repository ? [`- Source: ${repository}`] : []),
    '',
    '```text',
    licenseText.trim(),
    ...(noticeText ? ['', noticeText.trim()] : []),
    '```',
    ''
  ].join('\n')
);

fs.writeFileSync(
  path.join(outDir, 'THIRD_PARTY_NOTICES.md'),
  [
    '# Third-party notices',
    '',
    'Solvey Diagram Editor includes the following third-party software and fonts.',
    'Each is listed with its full licence text.',
    '',
    ...sections
  ].join('\n')
);
console.log(`Wrote ${entries.length} notices to ${outDir}/THIRD_PARTY_NOTICES.md`);
