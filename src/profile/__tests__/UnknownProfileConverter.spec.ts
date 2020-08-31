import UnknownProfileConverter from '../UnknownProfileConverter';
import { BSCharacteristic, BSProfile, TypeName } from '../../Types';

describe('UnknownProfileConverter', () => {
  it('should be able to handle characteristics that does not have a converter', () => {
    const converter = new UnknownProfileConverter('Weird Stuff');

    const bsProfile = {
      $: {
        typeName: 'Weird Unknown Type',
        name: 'Weird things'
      },
      characteristics: [
        {
          characteristic: [
            {
              $: {
                name: 'Super Strange'
              },
              _: 'Off the charts'
            },
            {
              $: {
                name: 'Some other stuff'
              },
              _: 'Stuff'
            }
          ]
        }
      ]
    } as unknown;

    const profile = converter.convert(bsProfile as BSProfile<BSCharacteristic>);

    expect(profile).toEqual({
      typeName: TypeName.UNKNOWN,
      unexpectedTypeName: 'Weird Stuff',
      name: 'Weird things',
      'Super Strange': 'Off the charts',
      'Some other stuff': 'Stuff'
    });
    expect(profile).toMatchSnapshot();
  });

  it('should be able to handle profiles without characteristics', () => {
    const converter = new UnknownProfileConverter('Weird Stuff');

    const bsProfile = {
      $: {
        typeName: 'Weird Unknown Type',
        name: 'Weird things'
      },
      characteristics: []
    } as unknown;

    const profile = converter.convert(bsProfile as BSProfile<BSCharacteristic>);

    expect(profile).toEqual({
      typeName: TypeName.UNKNOWN,
      unexpectedTypeName: 'Weird Stuff',
      name: 'Weird things'
    });
    expect(profile).toMatchSnapshot();
  });
});
