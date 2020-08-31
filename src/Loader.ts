import unzipper from 'unzipper';
import parser from 'xml2js';
import fs from 'fs';
import { BSRoster } from './types';

export interface Loader {
  load(): Promise<BSRoster>;
}

export class RosterLoader implements Loader {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  load(): Promise<BSRoster> {
    return new Promise((resolve, reject) => {
      fs.createReadStream(this.path)
        .pipe(unzipper.Parse())
        .on('entry', async (entry) => {
          const data: Buffer = await entry.buffer();

          return parser.parseString(data, (err: Error, result) => {
            if (err) return reject(err);
            if (!result) return reject('Failed to parse entry');
            resolve(result.roster);
          });
        })
        .on('error', (err: Error) => {
          reject(err);
        });
    });
  }
}
