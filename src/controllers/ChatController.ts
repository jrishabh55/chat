import { Socket } from 'socket.io';
import { autobind } from 'core-decorators';
import { events } from 'app';
import { Types } from 'db';
import Chat, { IChat } from 'models/Chat';
import { ICreateChatData, INewMessage } from 'interfaces/Chat';
import User from 'models/User';
import Message from 'models/Message';
import { Controller } from 'controllers/Controller';

@autobind
export class ChatController extends Controller {

  protected chatRooms: { [key: string]: Socket } = {};

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

      const chatRoom = `chat-${$chat.id}`;

      this.socket.emit(events.createChat, {
        status: 'ok',
        chat: $chat.toJSON()
      });

      this.setupChatRoom(chatRoom);
      this.setupChatRoomMessage(chatRoom);

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

  public async setupChatRoomMessage(chatRoom: string) {
    this.chatRooms[chatRoom].on(events.newMessage, this.newChatMessage);
  }

  public async newChatMessage(data: INewMessage) {
    const { chatRoom, message, user } = data;
    const $chat = await Message.create({
      user_id: user.id,
      message: message.value,
      type: message.type,
      chat_id: chatRoom.split('_')[1],
    });

    this.chatRooms[chatRoom].emit($chat.toJSON());
  }

  public async setupChatRoom(chatRoom: string) {
    this.socket.join(chatRoom);
    this.chatRooms[chatRoom] = this.socket.in(chatRoom);
  }
}

const instance = new ChatController();

export default instance;
