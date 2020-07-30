import Parser from '../Parser';
import rosterFile from './testLoaderOutput.json';

jest.mock('../Loader', () => {
  return function () {
    return { load: () => Promise.resolve(rosterFile) };
  };
});

describe('Parser', () => {
  it('should be able to parse a Battlescribe roster', async () => {
    const roster = await Parser.parse('some absolute path');
    expect(Object.assign({}, roster)).toEqual({
      name: 'My awesome list',
      system: 'Bazooka Joe',
      battleSizes: [
        {
          value: 5,
          name: 'PL'
        },
        {
          value: 42,
          name: 'pts'
        }
      ],
      maxBattleSizes: [
        {
          value: 1337,
          name: 'pts'
        }
      ],
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
