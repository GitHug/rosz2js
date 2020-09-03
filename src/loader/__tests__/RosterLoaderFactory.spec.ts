import RosterLoaderFactory from '../RosterLoaderFactory';
import PathRosterLoader from '../PathRosterLoader';
import BufferRosterLoader from '../BufferRosterLoader';
import UnhandledInputRosterLoader from '../UnhandledInputRosterLoader';

describe('RosterLoaderFactory', () => {
  it('should produce a PathRosterLoader', () => {
    expect(RosterLoaderFactory.getLoader('/some/path')).toBeInstanceOf(PathRosterLoader);
  });

  it('should produce a BufferRosterLoader', () => {
    expect(RosterLoaderFactory.getLoader(Buffer.from(['some', 'path']))).toBeInstanceOf(BufferRosterLoader);
  });

  it('should produce a UnhandledInputRosterLoader', () => {
    expect(RosterLoaderFactory.getLoader(42)).toBeInstanceOf(UnhandledInputRosterLoader);
  });
});
