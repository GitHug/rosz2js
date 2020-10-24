import Parser from '../Parser';
import rosterFile1 from './testData1.json';
import rosterFile2 from './testData2.json';
import expectedResult1 from './expectedResult1.json';
import expectedResult2 from './expectedResult2.json';
import RosterLoaderFactory from '../loader/RosterLoaderFactory';
import { BSRoster } from '../types';

jest.mock('../loader/RosterLoaderFactory');

const mockedFactory = RosterLoaderFactory as jest.Mocked<typeof RosterLoaderFactory>;

[
  { testName: 'Test data 1', testDataJson: rosterFile1, expectedResultJson: expectedResult1 },
  { testName: 'Test data 2', testDataJson: rosterFile2, expectedResultJson: expectedResult2 }
].forEach(({testName, testDataJson, expectedResultJson}) => {
  describe('Parser', () => {
    it(`should be able to parse a Battlescribe roster for ${testName}`, async () => {
      mockedFactory.getLoader.mockImplementationOnce(() => ({
        load: () => Promise.resolve((testDataJson as unknown) as BSRoster)
      }));
  
      const roster = await Parser.parse('some absolute path');
      expect(Object.assign({}, roster)).toEqual(expectedResultJson);
    });
  });
});
