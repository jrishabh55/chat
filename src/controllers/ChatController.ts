import { Socket } from 'socket.io';
import { autobind } from 'core-decorators';
import { events } from 'app';
import { Types } from 'db';
import Chat, { IChat } from 'models/Chat';
import { ICreateChatData } from 'interfaces/Chat';
import User from 'models/User';
import { Controller } from 'controllers/Controller';

@autobind
export class ChatController extends Controller {

  public socket: Socket;

  public async create(data: ICreateChatData) {
    const { name, users } = data.chat;

    const $users = await User.find({
      '_id': {
        $in: users.map(id => Types.ObjectId(id))
      }
    }).exec();

    if ($users.length > 0) {
      const $chat = await Chat.create({
        name,
        users: $users.map(u => u.id)
      });

      this.socket.emit(events.createChat, {
        status: 'ok',
        chat: $chat.toJSON()
      });

    } else {
      this.socket.emit(events.createChat, {
        status: 'error',
        error: [
          {
            message: 'Users Not found.'
          }
        ]
      });
    }
  }
}

const instance = new ChatController();

export default instance;
