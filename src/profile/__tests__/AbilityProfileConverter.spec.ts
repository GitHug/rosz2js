import AbilityProfileConverter from '../AbilityProfileConverter';
import { BSTypeName, TypeName } from '../../Types';

describe('AbilityProfileConverter', () => {
  it('should convert ability characteristics', () => {
    const converter = new AbilityProfileConverter();

    const profile = converter.convert({
      $: {
        typeName: BSTypeName.ABILITIES,
        name: 'Super Ability'
      },
      characteristics: [
        {
          characteristic: [
            {
              $: {
                name: 'Description'
              },
              _: 'Extra Ability'
            }
          ]
        }
      ]
    });

    expect(profile).toEqual({
      typeName: TypeName.ABILITY,
      name: 'Super Ability',
      description: 'Extra Ability'
    });
    expect(profile).toMatchSnapshot();
  });

  it('should have default values', () => {
    const converter = new AbilityProfileConverter();

    const profile = converter.convert({
      $: {
        typeName: BSTypeName.ABILITIES,
        name: 'Super Ability'
      },
      characteristics: []
    });

    expect(profile).toEqual({
      typeName: TypeName.ABILITY,
      name: 'Super Ability',
      description: '-'
    });
    expect(profile).toMatchSnapshot();
  });
});
