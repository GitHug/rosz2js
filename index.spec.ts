import * as index from './index';
import path from 'path';
import fs from 'fs';

describe('Entry point', () => {
  it('should export the parser as default', () => {
    expect(index.default.parse).toBeDefined();
  });

  it('should parse a roster file with an absolute path', async () => {
    const parsed = await index.default.parse(path.resolve('./example/rosterFile.rosz'));
    expect(parsed).toMatchSnapshot();
  });

  it('should parse a roster file buffer', async () => {
    const buffer: Buffer = fs.readFileSync('./example/rosterFile.rosz');
    const parsed = await index.default.parse(buffer);
    expect(parsed).toMatchSnapshot();
  });
});
