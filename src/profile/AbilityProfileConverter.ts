import AbstractProfileConverter from './AbstractProfileConverter';
import { AbilityProfile, BSAbilitiesCharacteristic, TypeName } from '../types';

class AbilityProfileConverter extends AbstractProfileConverter<AbilityProfile, BSAbilitiesCharacteristic> {
  constructor() {
    super({
      typeName: TypeName.ABILITY,
      name: '-',
      description: '-'
    });
  }

  protected getProperty(bsCharacteristic: BSAbilitiesCharacteristic): Partial<AbilityProfile> {
    return bsCharacteristic.$.name === 'Description' ? { description: bsCharacteristic._ } : {};
  }
}

export default AbilityProfileConverter;
