import { BSWeaponCharacteristic, WeaponProfile, TypeName } from '../types';
import AbstractProfileConverter from './AbstractProfileConverter';

class WeaponProfileConverter extends AbstractProfileConverter<WeaponProfile, BSWeaponCharacteristic> {
  constructor() {
    super({
      typeName: TypeName.WEAPON,
      name: '-',
      range: '-',
      type: '-',
      strength: '-',
      armourPenetration: '-',
      damage: '-',
      abilities: '-'
    });
  }

  protected getProperty(bsCharacteristic: BSWeaponCharacteristic): Partial<WeaponProfile> {
    switch (bsCharacteristic.$.name) {
      case 'Range':
        return { range: bsCharacteristic._ };
      case 'Type':
        return { type: bsCharacteristic._ };
      case 'S':
        return { strength: bsCharacteristic._ };
      case 'AP':
        return { armourPenetration: bsCharacteristic._ };
      case 'D':
        return { damage: bsCharacteristic._ };
      case 'Abilities':
        return { abilities: bsCharacteristic._ };
    }
  }
}

export default WeaponProfileConverter;
