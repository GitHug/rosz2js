import AbstractProfileConverter from './AbstractProfileConverter';
import { UnknownProfile, BSCharacteristic, TypeName } from '../types';

class UnknownProfileConverter extends AbstractProfileConverter<UnknownProfile, BSCharacteristic> {
  constructor(unexpectedTypeName: string) {
    super({
      typeName: TypeName.UNKNOWN,
      name: '-',
      unexpectedTypeName
    });
  }

  protected getProperty(bsCharacteristic: BSCharacteristic): Partial<UnknownProfile> {
    return { [bsCharacteristic.$.name]: bsCharacteristic._ };
  }
}

export default UnknownProfileConverter;
