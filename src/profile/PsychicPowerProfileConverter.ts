import AbstractProfileConverter from './AbstractProfileConverter';
import { PsychicPowerProfile, BSPsychicPowerCharacteristic, TypeName } from '../types';

class PsychicPowerProfileConverter extends AbstractProfileConverter<PsychicPowerProfile, BSPsychicPowerCharacteristic> {
  constructor() {
    super({
      typeName: TypeName.PSYCHIC_POWER,
      name: '-',
      warpCharge: '-',
      range: '-',
      details: '-'
    });
  }

  protected getProperty(bsCharacteristic: BSPsychicPowerCharacteristic): Partial<PsychicPowerProfile> {
    switch (bsCharacteristic.$.name) {
      case 'Warp Charge':
        return { warpCharge: bsCharacteristic._ };
      case 'Range':
        return { range: bsCharacteristic._ };
      case 'Details':
        return { details: bsCharacteristic._ };
    }
  }
}

export default PsychicPowerProfileConverter;
