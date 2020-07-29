import Detachment from './Detachment';

class Roster {
  system: string;
  name: string;
  detachments: Detachment[] = [];

  constructor(system: string, name: string) {
    this.system = system;
    this.name = name;
  }

  addDetachment(detachment: Detachment): void {
    this.detachments.push(detachment);
  }
}

export default Roster;
