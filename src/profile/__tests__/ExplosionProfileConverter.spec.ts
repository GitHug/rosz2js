import ExplosionProfileConverter from '../ExplosionProfileConverter';
import { BSTypeName, TypeName } from '../../Types';

describe('ExplosionProfileConverter', () => {
  it('should convert explosion characteristics', () => {
    const converter = new ExplosionProfileConverter();

    const profile = converter.convert({
      $: {
        typeName: BSTypeName.EXPLOSION,
        name: 'Megablast'
      },
      characteristics: [
        {
          characteristic: [
            {
              $: {
                name: 'Dice roll'
              },
              _: '42'
            },
            {
              $: {
                name: 'Distance'
              },
              _: '200cm'
            },
            {
              $: {
                name: 'Mortal wounds'
              },
              _: 'A lot'
            }
          ]
        }
      ]
    });

    expect(profile).toEqual({
      typeName: TypeName.EXPLOSION,
      name: 'Megablast',
      diceRoll: '42',
      distance: '200cm',
      mortalWounds: 'A lot'
    });
    expect(profile).toMatchSnapshot();
  });

  it('should have default values', () => {
    const converter = new ExplosionProfileConverter();

    const profile = converter.convert({
      $: {
        typeName: BSTypeName.EXPLOSION,
        name: 'Megablast'
      },
      characteristics: []
    });

    expect(profile).toEqual({
      typeName: TypeName.EXPLOSION,
      name: 'Megablast',
      diceRoll: '-',
      distance: '-',
      mortalWounds: '-'
    });
    expect(profile).toMatchSnapshot();
  });
});
