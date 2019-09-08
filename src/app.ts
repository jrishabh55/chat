import { Socket } from "socket.io";
import ChatController from "controllers/ChatController";
import UserController from "controllers/UserController";

export const events = {
  createUser: 'create-user',
  createChat: 'create-chat',
  listChats: 'list-chats',
  listMessages: 'list-messages',
  newMessage: 'new-message',
};

let socket: Socket;

export const app = {
  events,
  socket: null as any as Socket,
  setSockets($socket: Socket) {
    socket = $socket;
    this.socket = socket;
    ChatController.setSockets(this.socket);
    UserController.setSockets(this.socket);
  }
};


export default app;
