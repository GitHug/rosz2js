import * as index from './index';

describe('Entry point', () => {
  it('should export the parser', () => {
    expect(index.default.parse).toBeDefined();
  });

  it('should have named exports', () => {
    expect(index.Roster).toBeDefined();
    expect(index.Detachment).toBeDefined();
    expect(index.Unit).toBeDefined();
    expect(index.Option).toBeDefined();
  });
});
