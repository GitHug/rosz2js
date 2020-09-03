import { BSRoster } from '../types';
import parser from 'xml2js';
import RosterLoader from './RosterLoader';

export default abstract class AbstractRosterLoader implements RosterLoader {
  abstract load(): Promise<BSRoster>;

  protected parseString(data: Buffer): Promise<BSRoster> {
    return new Promise((resolve, reject) => {
      parser.parseString(data, (err: Error, result) => {
        if (err) return reject(err);
        if (!result) return reject(new Error('Failed to parse entry'));
        return resolve(result.roster);
      });
    });
  }
}
