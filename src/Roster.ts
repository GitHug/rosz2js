import Detachment from './Detachment';
import { Size } from './Size';

class Roster {
  system: string;
  name: string;
  detachments: Detachment[] = [];
  sizes: Size[] = [];
  maxSizes: Size[] = [];

  constructor(system: string, name: string) {
    this.system = system;
    this.name = name;
  }

  addDetachment(detachment: Detachment): void {
    this.detachments.push(detachment);
  }

  addSize(size: Size): void {
    this.sizes.push(size);
  }

  addMaxSize(size: Size): void {
    this.maxSizes.push(size);
  }
}

export default Roster;
