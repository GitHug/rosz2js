import { BSRoster } from '../types';

export default interface RosterLoader {
  load(): Promise<BSRoster>;
}
