import Option from './Option';

class Unit {
  name: string;
  customName?: string;
  note?: string;
  options: Option[] = [];
  type?: string;

  constructor(name: string, type?: string, customName?: string, note?: string) {
    this.name = name;
    this.type = type;
    this.customName = customName;
    this.note = note;
  }

  addOption(option: Option): void {
    this.options.push(option);
  }
}

export default Unit;
