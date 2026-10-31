import { diagramData } from '@mermaid-js/examples';
import mermaid from 'mermaid';
import { describe, expect, it } from 'vitest';
import { describeDiagram } from './diagramTypes';

// Ids as returned by `mermaid.parse(code).diagramType` for real diagrams.
describe('describeDiagram', () => {
  it('returns undefined when no diagram type was detected', () => {
    expect(describeDiagram(undefined)).toBeUndefined();
    expect(describeDiagram('')).toBeUndefined();
  });

  it.each(['flowchart-v2', 'flowchart-elk', 'flowchart', 'graph'])(
    'normalizes %s onto flowchart',
    (detected) => {
      expect(describeDiagram(detected)?.id).toBe('flowchart');
    }
  );

  it.each(['classDiagram', 'class'])('links %s diagrams to the class diagram docs', (detected) => {
    expect(describeDiagram(detected)?.docs).toEqual({
      code: '/syntax/classDiagram.html',
      config: '/syntax/classDiagram.html#configuration'
    });
  });

  it('links sequence diagrams to the sequence diagram docs', () => {
    expect(describeDiagram('sequence')?.docs?.code).toBe('/syntax/sequenceDiagram.html');
  });

  it.each([
    ['railroadEbnf', '/syntax/railroad.html#ebnf-railroad-ebnf-beta'],
    ['swimlane', '/syntax/swimlanes.html'],
    ['treeView', '/syntax/treeView.html']
  ])('links %s to its docs page', (detected, code) => {
    expect(describeDiagram(detected)?.docs?.code).toBe(code);
  });

  it('describes unknown diagram types without docs', () => {
    expect(describeDiagram('not-a-diagram')).toEqual({
      id: 'not-a-diagram'
    });
  });

  // Fails when mermaid ships a diagram type the catalog doesn't know yet:
  // add its docs paths from packages/mermaid/src/docs/syntax in the mermaid repo.
  it('has docs for every sample diagram', async () => {
    const missing: string[] = [];
    for (const { name, examples } of diagramData) {
      const example = examples?.[0];
      if (!example) {
        continue;
      }
      const { diagramType } = await mermaid.parse(example.code);
      if (!describeDiagram(diagramType)?.docs) {
        missing.push(`${name} (${diagramType})`);
      }
    }
    expect(missing).toEqual([]);
  });
});
