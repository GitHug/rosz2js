import unzipper from 'unzipper';
import fs from 'fs';
import { BSRoster } from '../types';
import AbstractRosterLoader from './AbstractRosterLoader';

export default class PathRosterLoader extends AbstractRosterLoader {
  private path: string;

  constructor(path: string) {
    super();
    this.path = path;
  }

  load(): Promise<BSRoster> {
    return new Promise((resolve, reject) => {
      fs.createReadStream(this.path)
        .pipe(unzipper.Parse())
        .on('entry', async (entry) => {
          const data: Buffer = await entry.buffer();

          try {
            const result = await this.parseString(data);
            return resolve(result);
          } catch (err) {
            return reject(err);
          }
        })
        .on('error', (err: Error) => {
          reject(err);
        });
    });
  }
}
