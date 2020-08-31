import { ExplosionProfile, BSExplosionCharacteristic, TypeName } from '../types';
import AbstractProfileConverter from './AbstractProfileConverter';

class ExplosionProfileConverter extends AbstractProfileConverter<ExplosionProfile, BSExplosionCharacteristic> {
  constructor() {
    super({
      typeName: TypeName.EXPLOSION,
      name: '-',
      diceRoll: '-',
      distance: '-',
      mortalWounds: '-'
    });
  }

  protected getProperty(bsCharacteristic: BSExplosionCharacteristic): Partial<ExplosionProfile> {
    switch (bsCharacteristic.$.name) {
      case 'Dice roll':
        return { diceRoll: bsCharacteristic._ };
      case 'Distance':
        return { distance: bsCharacteristic._ };
      case 'Mortal wounds':
        return { mortalWounds: bsCharacteristic._ };
    }
  }
}

export default ExplosionProfileConverter;
