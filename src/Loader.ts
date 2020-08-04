import unzipper from 'unzipper';
import parser from 'xml2js';
import fs from 'fs';

export interface Cost {
  $: {
    value: string;
    name: string;
  };
}

export interface IForce {
  $: {
    name: string;
    catalogueName: string;
  };

  selections: [
    {
      selection: Selection[];
    }
  ];
}

export interface Category {
  $: {
    primary: string;
    name: string;
  };
}

export interface Selection {
  $: {
    name: string;
    number?: string;
    type?: string;
    customName?: string;
    customNote?: string;
  };

  costs?: [
    {
      cost: Cost[];
    }
  ];

  selections?: [
    {
      selection: Selection[];
    }
  ];

  categories?: [
    {
      category: Category[];
    }
  ];
}

export interface RosterFile {
  roster: {
    $: {
      gameSystemName: string;
      name: string;
    };

    costs: [
      {
        cost: Cost[];
      }
    ];

    costLimits: [
      {
        costLimit: Cost[];
      }
    ];

    forces: [
      {
        force: IForce[];
      }
    ];
  };
}

class Loader {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  load(): Promise<RosterFile> {
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
