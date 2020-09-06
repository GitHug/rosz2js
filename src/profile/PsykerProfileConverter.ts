import AbstractProfileConverter from './AbstractProfileConverter';
import { PsykerProfile, BSPsykerCharacteristic, TypeName } from '../types';

class PsykerProfileConverter extends AbstractProfileConverter<PsykerProfile, BSPsykerCharacteristic> {
  constructor() {
    super({
      typeName: TypeName.PSYKER,
      name: '-',
      cast: '-',
      deny: '-',
      powersKnown: '-'
    });
  }

  protected getProperty(bsCharacteristic: BSPsykerCharacteristic): Partial<PsykerProfile> {
    switch (bsCharacteristic.$.name) {
      case 'Cast':
        return { cast: bsCharacteristic._ };
      case 'Deny':
        return { deny: bsCharacteristic._ };
      case 'Powers Known':
        return { powersKnown: bsCharacteristic._ };
      case 'Other':
        return { other: bsCharacteristic._ };
    }
  }
}

export default PsykerProfileConverter;
