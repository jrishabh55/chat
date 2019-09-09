import { Socket, Server } from 'socket.io';
import { autobind } from 'core-decorators';
import app from 'app';

@autobind
export class Controller {
  protected socket: Socket = app && app.socket;
  protected io: Server = app && app.io;

  public setSockets(socket: Socket) {
    this.socket = socket;
  }

  public setIo(io: Server) {
    this.io = io;
  }

  protected emit (event: string, ...args: any) {
    this.socket.emit(event, ...args);
  }
}
