import AbstractProfileConverter from './AbstractProfileConverter';
import { UnitProfile, BSUnitCharacteristic, TypeName } from '../types';

class UnitProfileConverter extends AbstractProfileConverter<UnitProfile, BSUnitCharacteristic> {
  constructor() {
    super({
      typeName: TypeName.UNIT,
      name: '-',
      movement: '-',
      weaponSkill: '-',
      ballisticSkill: '-',
      strength: '-',
      toughness: '-',
      wounds: '-',
      attacks: '-',
      leadership: '-',
      save: '-'
    });
  }

  protected getProperty(bsCharacteristic: BSUnitCharacteristic): Partial<UnitProfile> {
    switch (bsCharacteristic.$.name) {
      case 'M':
        return { movement: bsCharacteristic._ };
      case 'WS':
        return { weaponSkill: bsCharacteristic._ };
      case 'BS':
        return { ballisticSkill: bsCharacteristic._ };
      case 'S':
        return { strength: bsCharacteristic._ };
      case 'T':
        return { toughness: bsCharacteristic._ };
      case 'W':
        return { wounds: bsCharacteristic._ };
      case 'A':
        return { attacks: bsCharacteristic._ };
      case 'Ld':
        return { leadership: bsCharacteristic._ };
      case 'Save':
        return { save: bsCharacteristic._ };
    }
  }
}

export default UnitProfileConverter;
