import PsykerProfileConverter from '../PsykerProfileConverter';
import { BSTypeName, TypeName } from '../../types';

describe('PsykerProfileConverter', () => {
  it('should convert psyker characteristics', () => {
    const converter = new PsykerProfileConverter();

    const profile = converter.convert({
      $: {
        typeName: BSTypeName.PSYKER,
        name: 'Dr. Sputnik'
      },
      characteristics: [
        {
          characteristic: [
            {
              $: {
                name: 'Cast'
              },
              _: '5'
            },
            {
              $: {
                name: 'Deny'
              },
              _: '42'
            },
            {
              $: {
                name: 'Powers Known'
              },
              _: 'Brain Freeze'
            },
            {
              $: {
                name: 'Other'
              }
            }
          ]
        }
      ]
    });

    expect(profile).toEqual({
      typeName: TypeName.PSYKER,
      name: 'Dr. Sputnik',
      cast: '5',
      deny: '42',
      powersKnown: 'Brain Freeze'
    });
  });

  it('should handle default values', () => {
    const converter = new PsykerProfileConverter();

    const profile = converter.convert({
      $: {
        typeName: BSTypeName.PSYKER,
        name: 'Dr. Sputnik'
      },
      characteristics: []
    });

    expect(profile).toEqual({
      typeName: TypeName.PSYKER,
      name: 'Dr. Sputnik',
      cast: '-',
      deny: '-',
      powersKnown: '-'
    });
  });
});
