import WoundTrackProfileConverter from '../WoundTrackProfileConverter';
import { BSTypeName, TypeName } from '../../types';

describe('WoundTrackProfileConverter', () => {
  it('should convert wound track characteristics', () => {
    const converter = new WoundTrackProfileConverter();

    const profile = converter.convert({
      $: {
        typeName: BSTypeName.WOUND_TRACK,
        name: 'Valmet 655 Wound Track'
      },
      characteristics: [
        {
          characteristic: [
            {
              $: {
                name: 'Remaining W'
              },
              _: '1-2'
            },
            {
              $: {
                name: 'Characteristic 1'
              },
              _: 'Steering wheel'
            },
            {
              $: {
                name: 'Characteristic 2'
              },
              _: 'Loose screw'
            }
          ]
        }
      ]
    });

    expect(profile).toEqual({
      typeName: TypeName.WOUND_TRACK,
      name: 'Valmet 655 Wound Track',
      remainingWounds: '1-2',
      'Characteristic 1': 'Steering wheel',
      'Characteristic 2': 'Loose screw'
    });
  });

  it('should have default values', () => {
    const converter = new WoundTrackProfileConverter();

    const profile = converter.convert({
      $: {
        typeName: BSTypeName.WOUND_TRACK,
        name: 'Valmet 655 Wound Track'
      },
      characteristics: []
    });

    expect(profile).toEqual({
      typeName: TypeName.WOUND_TRACK,
      name: 'Valmet 655 Wound Track',
      remainingWounds: '-'
    });
  });
});
