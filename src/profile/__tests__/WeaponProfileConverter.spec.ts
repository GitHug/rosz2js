import WeaponProfileConverter from '../WeaponProfileConverter';
import { BSTypeName, TypeName } from '../../types';

describe('WeaponProfileConverter', () => {
  it('should convert weapon characteristics', () => {
    const converter = new WeaponProfileConverter();

    const profile = converter.convert({
      $: {
        typeName: BSTypeName.WEAPON,
        name: 'Super powerful laser beam'
      },
      characteristics: [
        {
          characteristic: [
            {
              $: {
                name: 'Range'
              },
              _: '120km'
            },
            {
              $: {
                name: 'Type'
              },
              _: 'Extreme Power'
            },
            {
              $: {
                name: 'S'
              },
              _: '9999'
            },
            {
              $: {
                name: 'AP'
              },
              _: '99'
            },
            {
              $: {
                name: 'D'
              },
              _: '100'
            },
            {
              $: {
                name: 'Abilities'
              },
              _: 'It melts absolutely everything'
            }
          ]
        }
      ]
    });

    expect(profile).toEqual({
      typeName: TypeName.WEAPON,
      name: 'Super powerful laser beam',
      range: '120km',
      type: 'Extreme Power',
      strength: '9999',
      armourPenetration: '99',
      damage: '100',
      abilities: 'It melts absolutely everything'
    });
    expect(profile).toMatchSnapshot();
  });

  it('should have default values', () => {
    const converter = new WeaponProfileConverter();

    const profile = converter.convert({
      $: {
        typeName: BSTypeName.WEAPON,
        name: 'Super powerful laser beam'
      },
      characteristics: []
    });

    expect(profile).toEqual({
      typeName: TypeName.WEAPON,
      name: 'Super powerful laser beam',
      range: '-',
      type: '-',
      strength: '-',
      armourPenetration: '-',
      damage: '-',
      abilities: '-'
    });
    expect(profile).toMatchSnapshot();
  });
});
