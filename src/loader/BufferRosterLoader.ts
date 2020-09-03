import AbstractRosterLoader from './AbstractRosterLoader';
import { BSRoster } from '../types';
import unzipper from 'unzipper';

export default class BufferRosterLoader extends AbstractRosterLoader {
  private buffer: Buffer;

  constructor(buffer: Buffer) {
    super();
    this.buffer = buffer;
  }

  async load(): Promise<BSRoster> {
    const directory = await unzipper.Open.buffer(this.buffer);
    const data = await directory.files[0].buffer();

    return this.parseString(data);
  }
}
