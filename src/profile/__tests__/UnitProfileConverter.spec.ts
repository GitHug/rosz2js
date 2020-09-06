import UnitProfileConverter from '../UnitProfileConverter';
import { BSTypeName, TypeName } from '../../types';

describe('UnitProfileConverter', () => {
  it('should convert unit characteristics', () => {
    const converter = new UnitProfileConverter();

    const profile = converter.convert({
      $: {
        typeName: BSTypeName.UNIT,
        name: 'Cannon Fodder'
      },
      characteristics: [
        {
          characteristic: [
            {
              $: {
                name: 'A'
              },
              _: '1'
            },
            {
              $: {
                name: 'BS'
              },
              _: '6+'
            },
            {
              $: {
                name: 'Ld'
              },
              _: '4'
            },
            {
              $: {
                name: 'M'
              },
              _: '3'
            },
            {
              $: {
                name: 'S'
              },
              _: '2'
            },
            {
              $: {
                name: 'Save'
              },
              _: '6+'
            },
            {
              $: {
                name: 'T'
              },
              _: '2'
            },
            {
              $: {
                name: 'W'
              },
              _: '1'
            },
            {
              $: {
                name: 'WS'
              },
              _: '6+'
            }
          ]
        }
      ]
    });

    expect(profile).toEqual({
      typeName: TypeName.UNIT,
      name: 'Cannon Fodder',
      movement: '3',
      weaponSkill: '6+',
      ballisticSkill: '6+',
      strength: '2',
      toughness: '2',
      attacks: '1',
      wounds: '1',
      leadership: '4',
      save: '6+'
    });
    expect(profile).toMatchSnapshot();
  });

  it('should have default values', () => {
    const converter = new UnitProfileConverter();

    const profile = converter.convert({
      $: {
        typeName: BSTypeName.UNIT,
        name: 'Cannon Fodder'
      },
      characteristics: []
    });

    expect(profile).toEqual({
      typeName: TypeName.UNIT,
      name: 'Cannon Fodder',
      movement: '-',
      weaponSkill: '-',
      ballisticSkill: '-',
      strength: '-',
      toughness: '-',
      attacks: '-',
      wounds: '-',
      leadership: '-',
      save: '-'
    });
    expect(profile).toMatchSnapshot();
  });
});
