import Parser from '../Parser';
import rosterFile from './testLoaderOutput.json';

jest.mock('../Loader', () => {
  return function () {
    return { load: () => Promise.resolve(rosterFile) };
  };
});

describe('Parser', () => {
  it('should be able to parse a Battlescribe roster', async () => {
    const roster = await new Parser('some absolute path').parse();
    expect(Object.assign({}, roster)).toEqual({
      name: 'My awesome list',
      system: 'Bazooka Joe',
      detachments: [
        {
          catalogue: 'Sears',
          name: 'Detachment',

          units: [
            {
              name: 'Super Strong Space Knight',
              customName: 'Sir Killalot',
              note: 'Very dangerous',
              type: 'Giga Support',
              options: [
                {
                  name: 'Titanic Hammer',
                  options: []
                }
              ]
            },
            {
              name: 'Peasant Squadron',
              type: 'Point Sink',
              options: [
                {
                  name: 'Five foot pole',
                  options: []
                }
              ]
            }
          ]
        }
      ]
    });
  });
});
