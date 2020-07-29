class Option {
  name: string;
  options: Option[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addOption(option: Option): void {
    this.options.push(option);
  }
}

export default Option;
