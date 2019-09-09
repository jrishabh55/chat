import { Socket, Server } from "socket.io";
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
let io: Server;

export const app = {
  events,
  socket: null as any as Socket,
  io: null as any as Server,
  setSockets($socket: Socket) {
    socket = $socket;
    this.socket = socket;
    ChatController.setSockets(this.socket);
    UserController.setSockets(this.socket);
  },
  setIo($io: Server) {
    io = $io;
    this.io = $io;
    ChatController.setIo(this.io);
    UserController.setIo(this.io);
  },

};


export default app;
