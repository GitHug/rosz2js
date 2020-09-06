import ProfileFactory from '../ProfileFactory';
import { BSTypeName, TypeName, BSCharacteristic, BSProfile } from '../../types';

describe('ProfileFactory', () => {
  it('should create AbilityProfile', () => {
    const profile = ProfileFactory.getProfile({
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

    expect(profile.typeName).toBe(TypeName.ABILITY);
  });

  it('should create ExplosionProfile', () => {
    const profile = ProfileFactory.getProfile({
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

    expect(profile.typeName).toBe(TypeName.EXPLOSION);
  });

  it('should create PsychicPowerProfile', () => {
    const profile = ProfileFactory.getProfile({
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

    expect(profile.typeName).toBe(TypeName.PSYCHIC_POWER);
  });

  it('should create PsykerProfile', () => {
    const profile = ProfileFactory.getProfile({
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

    expect(profile.typeName).toBe(TypeName.PSYKER);
  });

  it('should create TransportProfile', () => {
    const profile = ProfileFactory.getProfile({
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

    expect(profile.typeName).toBe(TypeName.TRANSPORT);
  });

  it('should create UnitProfile', () => {
    const profile = ProfileFactory.getProfile({
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

    expect(profile.typeName).toBe(TypeName.UNIT);
  });

  it('should create UnknownProfile', () => {
    const profile = ProfileFactory.getProfile(({
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
    } as unknown) as BSProfile<BSCharacteristic>);

    expect(profile.typeName).toBe(TypeName.UNKNOWN);
  });

  it('should create WeaponProfile', () => {
    const profile = ProfileFactory.getProfile({
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

    expect(profile.typeName).toBe(TypeName.WEAPON);
  });

  it('should create WoundTrackProfile', () => {
    const profile = ProfileFactory.getProfile({
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

    expect(profile.typeName).toBe(TypeName.WOUND_TRACK);
  });
});
