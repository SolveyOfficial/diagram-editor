import { test } from './test';

test.describe('Error display tests', () => {
  test('should show syntax errors in the Code tab', async ({ editPage }) => {
    await editPage.clearEditor();
    await editPage.typeInEditor('graph TD\nA --> B -->');
    await editPage.checkError('Syntax error');
  });

  test('should show syntax errors in the Config tab', async ({ editPage }) => {
    await editPage.clearEditor();
    await editPage.typeInEditor('graph TD\nA --> B');
    await editPage.setEditorMode('Config');
    await editPage.clearEditor();
    await editPage.typeInEditor('{\n  "theme": "default",\n  invalid json');
    await editPage.checkError('Syntax error');
  });
});
