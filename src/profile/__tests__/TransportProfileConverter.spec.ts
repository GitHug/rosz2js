import TransportProfileConverter from '../TransportProfileConverter';
import { BSTypeName, TypeName } from '../../Types';

describe('TransportProfileConverter', () => {
  it('should convert transport characteristics', () => {
    const converter = new TransportProfileConverter();

    const profile = converter.convert({
      $: {
        typeName: BSTypeName.TRANSPORT,
        name: 'Jeep Cherokee'
      },
      characteristics: [
        {
          characteristic: [
            {
              $: {
                name: 'Capacity'
              },
              _: '5 mid-sized people'
            }
          ]
        }
      ]
    });

    expect(profile).toEqual({
      typeName: TypeName.TRANSPORT,
      name: 'Jeep Cherokee',
      capacity: '5 mid-sized people'
    });
  });

  it('should have default values', () => {
    const converter = new TransportProfileConverter();

    const profile = converter.convert({
      $: {
        typeName: BSTypeName.TRANSPORT,
        name: 'Jeep Cherokee'
      },
      characteristics: []
    });

    expect(profile).toEqual({
      typeName: TypeName.TRANSPORT,
      name: 'Jeep Cherokee',
      capacity: '-'
    });
  });
});
