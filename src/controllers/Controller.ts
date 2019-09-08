import { Socket } from 'socket.io';
import { autobind } from 'core-decorators';
import app from 'app';

@autobind
export class Controller {
  protected socket: Socket = app && app.socket;

  public setSockets(socket: Socket) {
    this.socket = socket;
  }

  protected emit (event: string, ...args: any) {
    this.socket.emit(event, ...args);
  }
}
