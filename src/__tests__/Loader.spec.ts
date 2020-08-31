import { RosterLoader } from '../Loader';
import fs from 'fs';
import unzipper, { ParseStream } from 'unzipper';
import { mock } from 'jest-mock-extended';

jest.mock('fs');
jest.mock('unzipper');

const mockedFs = fs as jest.Mocked<typeof fs>;
const mockedUnzipper = unzipper as jest.Mocked<typeof unzipper>;

describe('Loader', () => {
  it('should parse the content of a zipped file', async () => {
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

    const content = await new RosterLoader('any/roster/file.rosz').load();
    expect(content).toEqual({
      $: {
        gameSystemName: 'Chess',
        name: '4D'
      },
      costs: [''],
      costLimits: [''],
      forces: ['']
    });
  });

  it('should throw an error if unzipping fails', async () => {
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

    return expect(new RosterLoader('any/roster/file.rosz').load()).rejects.toBe('failed to unzip');
  });

  it('should throw an error if parsing of the zip content fails', async () => {
    const mockParseStream = mock<ParseStream>();
    mockedUnzipper.Parse.mockReturnValueOnce(mockParseStream);

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

    return expect(new RosterLoader('any/roster/file.rosz').load()).rejects.toThrowError();
  });
});
