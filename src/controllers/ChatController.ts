import { Socket } from 'socket.io';
import { autobind } from 'core-decorators';
import { events } from 'app';
import Chat, { IChat } from 'models/Chat';
import { ICreateChatData } from 'interfaces/Chat';
import User from 'models/User';

@autobind
export class ChatController {

  public socket: Socket;

  public async create(data: ICreateChatData) {
    const { user, chat } = data;
    const $user = await User.findById(user.id);
    if ($user) {
      this.socket.emit(events.createChat, { user: $user.toJSON() });
    } else {
      this.socket.emit(events.createChat, {
        status: 'error',
        error: [
          {
            message: 'User Not found.'
          }
        ]
      });
    }
  }

  public setSockets(socket: Socket) {
    if (!socket) {
      this.socket = socket;
    }
  }

  private emit (event: string, ...args: any) {
    this.socket.emit(event, ...args);
  }
}

const instance = new ChatController();

export default instance;
