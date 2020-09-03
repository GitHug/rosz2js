import PathRosterLoader from '../PathRosterLoader';
import RosterLoader from '../RosterLoader';
import { mock } from 'jest-mock-extended';
import fs from 'fs';
import unzipper, { ParseStream } from 'unzipper';
import parser, { convertableToString } from 'xml2js';

jest.mock('fs');
jest.mock('unzipper');
jest.mock('xml2js');

const mockedFs = fs as jest.Mocked<typeof fs>;
const mockedUnzipper = unzipper as jest.Mocked<typeof unzipper>;
const mockedParser = parser as jest.Mocked<typeof parser>;

describe('PathRosterLoader', () => {
  it('loads a roster from a file path', async () => {
    const mockParseStream = mock<ParseStream>();
    mockedUnzipper.Parse.mockReturnValueOnce(mockParseStream);
    mockParseStream.on.mockImplementationOnce((event: string | symbol, cb: (...args: unknown[]) => void) => {
      const xml = `
      <?xml version="1.0" encoding="utf-8"?>
      <roster gameSystemName="Chess" name="4D">
        <costs />
        <costLimits />
        <forces />
      </roster>
      `;
      const buffer = Buffer.from(xml, 'utf8');

      const entry = {
        buffer() {
          return buffer;
        }
      };

      cb(entry);
      return mockParseStream;
    });

    const mockReadstream = mock<fs.ReadStream>();
    mockReadstream.pipe.mockReturnValueOnce(mockParseStream);
    mockedFs.createReadStream.mockReturnValueOnce(mockReadstream);

    const loader: RosterLoader = new PathRosterLoader('/file/path.rosz');
    expect(loader.load()).resolves.toEqual({
      $: {
        gameSystemName: 'Chess',
        name: '4D'
      },
      costs: [''],
      costLimits: [''],
      forces: ['']
    });
  });

  it('throws an error if unzipping fails', async () => {
    const mockParseStream = mock<ParseStream>();
    mockedUnzipper.Parse.mockReturnValueOnce(mockParseStream);

    mockParseStream.on.mockImplementationOnce(() => mockParseStream);
    mockParseStream.on.mockImplementationOnce((event: string | symbol, cb: (...args: unknown[]) => void) => {
      cb('failed to unzip');
      return mockParseStream;
    });

    const mockReadstream = mock<fs.ReadStream>();
    mockReadstream.pipe.mockReturnValueOnce(mockParseStream);
    mockedFs.createReadStream.mockReturnValueOnce(mockReadstream);

    const loader: RosterLoader = new PathRosterLoader('/file/path.rosz');
    return expect(loader.load()).rejects.toBe('failed to unzip');
  });

  it('should throw an error if parsing of the zip content fails', async () => {
    const mockParseStream = mock<ParseStream>();
    mockedUnzipper.Parse.mockReturnValueOnce(mockParseStream);
    mockedParser;

    mockParseStream.on.mockImplementationOnce((event: string | symbol, cb: (...args: unknown[]) => void) => {
      const xml = 'qasdwe---invalid xml<wqe></sd>';
      const buffer: Buffer = Buffer.from(xml, 'utf8');

      const entry = {
        buffer() {
          return buffer;
        }
      };

      cb(entry);
      return mockParseStream;
    });

    const mockReadstream = mock<fs.ReadStream>();
    mockReadstream.pipe.mockReturnValueOnce(mockParseStream);
    mockedFs.createReadStream.mockReturnValueOnce(mockReadstream);

    function parseString(data: convertableToString, cb: (err: Error, result: unknown) => void): void {
      cb(new Error('Failed to parse input'), undefined);
    }

    mockedParser.parseString = parseString as jest.Mocked<typeof mockedParser.parseString>;

    const loader: RosterLoader = new PathRosterLoader('/file/path.rosz');
    return expect(loader.load()).rejects.toThrowError();
  });
});
