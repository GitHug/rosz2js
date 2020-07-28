import unzipper from 'unzipper';
import parser from 'xml2js';
import fs from 'fs';

class Loader {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  load(): Promise<Record<string, unknown>> {
    return new Promise((resolve, reject) => {
      fs.createReadStream(this.path)
        .pipe(unzipper.Parse())
        .on('entry', async (entry) => {
          const data: Buffer = await entry.buffer();

          return parser.parseString(data, (err: Error, result) => {
            if (err) reject(err);
            resolve(result);
          });
        })
        .on('error', (err: Error) => {
          reject(err);
        });
    });
  }
}

export default Loader;
