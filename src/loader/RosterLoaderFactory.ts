import RosterLoader from './RosterLoader';
import { isString, isBuffer } from '../guards';
import { LoaderInput } from '../types';
import BufferRosterLoader from './BufferRosterLoader';
import PathRosterLoader from './PathRosterLoader';
import UnhandledInputRosterLoader from './UnhandledInputRosterLoader';

export default class RosterLoaderFactory {
  static getLoader(input: LoaderInput): RosterLoader {
    if (isBuffer(input)) return new BufferRosterLoader(input);
    if (isString(input)) return new PathRosterLoader(input);
    return new UnhandledInputRosterLoader(input);
  }
}
