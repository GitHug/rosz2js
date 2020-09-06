import BufferRosterLoader from '../BufferRosterLoader';
import RosterLoader from '../RosterLoader';
import unzipper, { CentralDirectory, File } from 'unzipper';
import parser, { convertableToString } from 'xml2js';

jest.mock('unzipper', () => ({
  Open: {
    buffer: () => ({
      files: [
        {
          buffer: () => Buffer.from(['some', 'data'])
        }
      ]
    })
  }
}));

jest.mock('xml2js', () => ({
  parseString: (data: Buffer, callback: (err: unknown, result: unknown) => void) => {
    callback(null, { roster: 'roster file data' });
  }
}));

const mockedUnzipper: jest.Mocked<typeof unzipper> = unzipper as jest.Mocked<typeof unzipper>;
const mockedParser = parser as jest.Mocked<typeof parser>;

describe('BufferRosterLoader', () => {
  it('loads a buffer into a roster', async () => {
    const loader: RosterLoader = new BufferRosterLoader(Buffer.from(['data']));
    return expect(loader.load()).resolves.toEqual('roster file data');
  });

  it('throws error if the buffer can not be opened', () => {
    mockedUnzipper.Open.buffer = () => Promise.reject(new Error('Failed to open buffer'));

    const loader: RosterLoader = new BufferRosterLoader(Buffer.from(['data']));
    return expect(loader.load()).rejects.toEqual(new Error('Failed to open buffer'));
  });

  it('throws error if the file data can not be buffered', () => {
    mockedUnzipper.Open.buffer = () => {
      const file: Partial<File> = {
        buffer: () => Promise.reject(new Error('Failed to open buffer to file'))
      };

      const dir: Partial<CentralDirectory> = {
        files: [file as File]
      };

      return Promise.resolve(dir as CentralDirectory);
    };

    const loader: RosterLoader = new BufferRosterLoader(Buffer.from(['data']));
    return expect(loader.load()).rejects.toEqual(new Error('Failed to open buffer to file'));
  });

  it('throws error if parsing returns null or undefined', () => {
    mockedUnzipper.Open.buffer = () => {
      const file: Partial<File> = {
        buffer: () => Promise.resolve(Buffer.from(['some', 'data']))
      };

      const dir: Partial<CentralDirectory> = {
        files: [file as File]
      };

      return Promise.resolve(dir as CentralDirectory);
    };

    function parseString(data: convertableToString, cb: (err: Error, result: unknown) => void): void {
      cb((undefined as unknown) as Error, undefined);
    }

    mockedParser.parseString = parseString as jest.Mocked<typeof mockedParser.parseString>;

    const loader: RosterLoader = new BufferRosterLoader(Buffer.from(['data']));
    return expect(loader.load()).rejects.toEqual(new Error('Failed to parse entry'));
  });

  it('throws error if parsing throws an error', () => {
    mockedUnzipper.Open.buffer = () => {
      const file: Partial<File> = {
        buffer: () => Promise.resolve(Buffer.from(['some', 'data']))
      };

      const dir: Partial<CentralDirectory> = {
        files: [file as File]
      };

      return Promise.resolve(dir as CentralDirectory);
    };

    function parseString(data: convertableToString, cb: (err: Error, result: unknown) => void): void {
      cb(new Error('Failed to parse input'), undefined);
    }

    mockedParser.parseString = parseString as jest.Mocked<typeof mockedParser.parseString>;

    const loader: RosterLoader = new BufferRosterLoader(Buffer.from(['data']));
    return expect(loader.load()).rejects.toEqual(new Error('Failed to parse input'));
  });
});
