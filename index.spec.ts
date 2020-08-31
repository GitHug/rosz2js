import * as index from './index';

describe('Entry point', () => {
  it('should export the parser', () => {
    expect(index.default.parse).toBeDefined();
  });
});
