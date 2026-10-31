import { describe, expect, it } from 'vitest';
import { getDiagramDocumentationUrl } from './diagramDocs';

const mermaidJsDocs = 'https://mermaid.js.org';

describe('getDiagramDocumentationUrl', () => {
  it('joins diagram paths onto the docs base', () => {
    expect(getDiagramDocumentationUrl('flowchart', 'code', mermaidJsDocs)).toBe(
      'https://mermaid.js.org/syntax/flowchart.html'
    );
  });

  it('ignores a trailing slash on the docs base', () => {
    expect(getDiagramDocumentationUrl('flowchart', 'code', `${mermaidJsDocs}/`)).toBe(
      'https://mermaid.js.org/syntax/flowchart.html'
    );
  });

  it('keeps a path prefix on the docs base', () => {
    expect(getDiagramDocumentationUrl('flowchart', 'code', 'https://docs.example/mermaid/')).toBe(
      'https://docs.example/mermaid/syntax/flowchart.html'
    );
  });

  it('uses the diagram-specific config anchor when editor mode is config', () => {
    expect(getDiagramDocumentationUrl('flowchart', 'config', mermaidJsDocs)).toBe(
      'https://mermaid.js.org/syntax/flowchart.html#configuration'
    );
  });

  it('falls back to the code docs page when a diagram has no config URL', () => {
    expect(getDiagramDocumentationUrl('stateDiagram', 'config', mermaidJsDocs)).toBe(
      'https://mermaid.js.org/syntax/stateDiagram.html'
    );
  });

  it('standardizes flowchart variants onto the flowchart docs page', () => {
    expect(getDiagramDocumentationUrl('flowchart-elk', 'code', mermaidJsDocs)).toBe(
      'https://mermaid.js.org/syntax/flowchart.html'
    );
  });

  it('links class diagrams to the class diagram page', () => {
    expect(getDiagramDocumentationUrl('classDiagram', 'config', mermaidJsDocs)).toBe(
      'https://mermaid.js.org/syntax/classDiagram.html#configuration'
    );
  });

  it('returns the docs base when the diagram type is unknown', () => {
    expect(getDiagramDocumentationUrl(undefined, 'code', mermaidJsDocs)).toBe(mermaidJsDocs);
    expect(getDiagramDocumentationUrl('not-a-diagram', 'code', mermaidJsDocs)).toBe(mermaidJsDocs);
  });
});
