import parser from './index';

describe('Entry point', () => {
  it('should be export the parser', () => {
    expect(parser.parse).toBeDefined();
  });
});
