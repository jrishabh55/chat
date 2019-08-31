import { Socket } from 'socket.io';
import { autobind } from 'core-decorators';
import { events } from 'app';
import Chat, { IChat } from 'models/Chat';
import { ICreateChatData } from 'interfaces/Chat';
import User from 'models/User';
import { Controller } from 'controllers/Controller';

@autobind
export class ChatController extends Controller {

  public socket: Socket;

  public async create(data: ICreateChatData) {
    const { user, chat } = data;
    const $user = await User.findById(user.id);
    if ($user) {
      const $chat = Chat.findOneOrCreate();
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
}

const instance = new ChatController();

export default instance;
