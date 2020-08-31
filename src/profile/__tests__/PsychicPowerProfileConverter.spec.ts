import PsychicPowerProfileConverter from '../PsychicPowerProfileConverter';
import { BSTypeName, TypeName } from '../../Types';

describe('PsychicPowerProfileConverter', () => {
  it('should convert psychic power abilities', () => {
    const converter = new PsychicPowerProfileConverter();

    const profile = converter.convert({
      $: {
        typeName: BSTypeName.PSYCHIC_POWER,
        name: 'Kablam!'
      },
      characteristics: [
        {
          characteristic: [
            {
              $: {
                name: 'Warp Charge'
              },
              _: '99'
            },
            {
              $: {
                name: 'Range'
              },
              _: '25mi'
            },
            {
              $: {
                name: 'Details'
              },
              _: 'Forbidden lore'
            }
          ]
        }
      ]
    });

    expect(profile).toEqual({
      typeName: TypeName.PSYCHIC_POWER,
      name: 'Kablam!',
      warpCharge: '99',
      range: '25mi',
      details: 'Forbidden lore'
    });
    expect(profile).toMatchSnapshot();
  });

  it('should have default values', () => {
    const converter = new PsychicPowerProfileConverter();

    const profile = converter.convert({
      $: {
        typeName: BSTypeName.PSYCHIC_POWER,
        name: 'Kablam!'
      },
      characteristics: []
    });

    expect(profile).toEqual({
      typeName: TypeName.PSYCHIC_POWER,
      name: 'Kablam!',
      warpCharge: '-',
      range: '-',
      details: '-'
    });
    expect(profile).toMatchSnapshot();
  });
});
