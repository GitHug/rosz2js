import ProfileConverter from './AbstractProfileConverter';
import { TransportProfile, BSTransportCharacteristic, TypeName } from '../types';

class TransportProfileConverter extends ProfileConverter<TransportProfile, BSTransportCharacteristic> {
  constructor() {
    super({
      typeName: TypeName.TRANSPORT,
      name: '-',
      capacity: '-'
    });
  }

  protected getProperty(bsCharacteristic: BSTransportCharacteristic): Partial<TransportProfile> {
    return bsCharacteristic.$.name === 'Capacity' ? { capacity: bsCharacteristic._ } : {};
  }
}

export default TransportProfileConverter;
