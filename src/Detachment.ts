import Unit from './Unit';

class Detachment {
  name: string;
  catalogue: string;
  units: Unit[] = [];

  constructor(name: string, catalogue: string) {
    this.name = name;
    this.catalogue = catalogue;
  }

  addUnit(unit: Unit): void {
    this.units.push(unit);
  }
}

export default Detachment;
