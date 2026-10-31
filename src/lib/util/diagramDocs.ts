import type { EditorMode } from '$/types';
import { describeDiagram } from './diagramTypes';
import { env } from './env';

const stripTrailingSlashes = (value: string) => value.replace(/\/+$/, '');

const resolveDocsBase = (docsUrl: string): string => {
  const parsed = new URL(docsUrl);
  return stripTrailingSlashes(parsed.origin + parsed.pathname);
};

const joinDocsUrl = (base: string, path: string): string => {
  if (!path) {
    return base;
  }
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
};

export const getDiagramDocumentationUrl = (
  diagramType: string | undefined,
  editorMode: EditorMode,
  docsUrl = env.docsUrl
): string => {
  const base = resolveDocsBase(docsUrl);
  const docs = describeDiagram(diagramType)?.docs;
  if (!docs) {
    return base;
  }
  return joinDocsUrl(base, docs[editorMode] ?? docs.code);
};
