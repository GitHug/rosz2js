import { Profile, TypeName, BSCharacteristic, BSProfile } from '../types';
import { isBSCharacteristic } from '../guards';

abstract class ProfileConverter<S extends Profile<TypeName>, T extends BSCharacteristic> {
  private profile: S;

  protected constructor(profile: S) {
    this.profile = profile;
  }

  convert(bsProfile: BSProfile<T>): S {
    this.profile.name = bsProfile.$.name || '-';

    bsProfile.characteristics.forEach((bsCharacteristic) => {
      if (isBSCharacteristic(bsCharacteristic)) {
        bsCharacteristic.characteristic.forEach((bsCharacteristic) => {
          Object.assign(this.profile, this.getProperty(bsCharacteristic));
        });
      }
    });

    return this.profile;
  }

  protected abstract getProperty(bsCharacteristic: T): Partial<S>;
}

export default ProfileConverter;
