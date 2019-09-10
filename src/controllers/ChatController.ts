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
      const $chat = (await Chat.create({
        name,
        users: $users.map(u => u.id)
      })).toJSON();

      this.socket.emit(events.createChat, {
        status: 'ok',
        chat: $chat,
      });

      this.setupChatRoomMessage($chat.id);
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
    console.log('Listening to', chatRoom);
    this.socket.on(`/chat/${chatRoom}/${events.newMessage}`, this.newChatMessage);
  }

  public async startListingToMessages() {
    Chat.find({}).exec().then((chats) => {
      chats.forEach(chat => {
        this.setupChatRoomMessage(chat.id);
      });
    });
  }

  public async newChatMessage(data: INewMessage) {
    const { chat, message, user } = data;

    const $message = await Message.create({
      user_id: user.id,
      message: message.value,
      type: message.type,
      chat_id: chat.id,
    });

    this.socket.emit(`/chat/${chat.id}/${events.newMessage}`, $message.toJSON());
  }
}

const instance = new ChatController();

export default instance;
