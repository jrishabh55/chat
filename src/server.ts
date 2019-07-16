import * as path from "path";
import express from "express";
import socketIo from "socket.io";
import { createServer } from "http";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import User from "models/User";
import Chat from "models/Chat";
import Message from "./models/Message";

const port = process.env.PORT || 3000;

const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());

const http = createServer(app);
const io = socketIo(http);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

io.on("connection", socket => {
  const listenChat = (name: string) => {
    socket.on(`chat-${name}`, async chatData => {
      const { user, msg } = chatData;
      const $user = await User.findOneOrCreate({ external_id: user.id }, { external_id: user.id });
      const $message = await Message.create({ msg, user_id: $user.id });
      console.log(chatData);
      io.emit(`chat-${name}`, { chatData,...$message.toJSON() });
    });
  };

  socket.on("new-chat", async data => {
    const { user, name } = data;
    const $user = await User.findOneOrCreate({ external_id: user.id }, { external_id: user.id });
    const $chat = await Chat.findOneOrCreate({ name }, { name, user_id: [$user.id] });
    console.log($chat.toJSON());
    io.emit('new-chat', $chat);
    listenChat($chat.id);
  });
});

http.listen(port, () => {
  console.log(`listening on *: ${port}`);
});
