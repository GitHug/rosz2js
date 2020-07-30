import Detachment from './Detachment';
import { Size } from './BattleSize';

class Roster {
  system: string;
  name: string;
  detachments: Detachment[] = [];
  battleSizes: Size[] = [];
  maxBattleSizes: Size[] = [];

  constructor(system: string, name: string) {
    this.system = system;
    this.name = name;
  }

  addDetachment(detachment: Detachment): void {
    this.detachments.push(detachment);
  }

  addBattleSize(size: Size): void {
    this.battleSizes.push(size);
  }

  addMaxBattleSize(size: Size): void {
    this.maxBattleSizes.push(size);
  }
}

export default Roster;
