import AbstractProfileConverter from './AbstractProfileConverter';
import { WoundTrackProfile, BSWoundTrackCharacteristic, TypeName } from '../types';

class WoundTrackProfileConverter extends AbstractProfileConverter<WoundTrackProfile, BSWoundTrackCharacteristic> {
  constructor() {
    super({
      typeName: TypeName.WOUND_TRACK,
      name: '-',
      remainingWounds: '-'
    });
  }

  protected getProperty(bsCharacteristic: BSWoundTrackCharacteristic): Partial<WoundTrackProfile> {
    if (bsCharacteristic.$.name === 'Remaining W') {
      return { remainingWounds: bsCharacteristic._ };
    } else {
      return { [bsCharacteristic.$.name]: bsCharacteristic._ };
    }
  }
}

export default WoundTrackProfileConverter;
