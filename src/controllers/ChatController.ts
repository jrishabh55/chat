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
    console.log(events.createChat, 'event triggered');

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

      // const chatRoom = `/chat/${$chat.id}`;

      this.setupChatRoom($chat)
      .then(() => {
          console.log('Setup Done');
          this.setupChatRoomMessage($chat.id);
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

  public async setupChatRoomMessage(chatRoom: string) {
    const socket = this.chatRooms[chatRoom];

    this.socket.emit(events.createChat, {
      status: 'ok',
      connectionUrl: socket.id,
    });

    this.chatRooms[chatRoom].on(events.newMessage, this.newChatMessage);
  }

  public async newChatMessage(data: INewMessage) {
    const { chatRoom, message, user } = data;
    console.log(data);
    const $chat = await Message.create({
      user_id: user.id,
      message: message.value,
      type: message.type,
      chat_id: chatRoom.split('/')[1],
    });

    this.chatRooms[chatRoom].emit($chat.toJSON());
  }

  public async setupChatRoom($chat: any): Promise<Socket> {
    const chatRoom = `/chat/${$chat.id}`;
    return new Promise((resolve) => {
      console.log(chatRoom);
      const nsp = this.io.of(chatRoom);
      console.log(this.io.of);
      console.log(nsp);

      nsp.on("connection", (socket) => {
        this.chatRooms[$chat.id] = socket;
        console.log('connected', this.chatRooms[$chat.id]);
        resolve(socket);
      });


      nsp.on('connection', (socket) => {
        console.log('someone connected');
      });

    });

  }
}

const instance = new ChatController();

export default instance;
