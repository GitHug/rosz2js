import AbstractRosterLoader from './AbstractRosterLoader';
import { BSRoster } from '../types';

export default class UnhandledInputRosterLoader extends AbstractRosterLoader {
  input: unknown;

  constructor(input: unknown) {
    super();
    this.input = input;
  }

  load(): Promise<BSRoster> {
    return Promise.reject(`Unexpected input! Unable to parse input ${this.input}.`);
  }
}
