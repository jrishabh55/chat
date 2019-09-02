import { Socket } from 'socket.io';
import { autobind } from 'core-decorators';

@autobind
export class Controller {
  protected socket: Socket;

  public setSockets(socket: Socket) {
    this.socket = socket;
  }

  protected emit (event: string, ...args: any) {
    this.socket.emit(event, ...args);
  }
}
