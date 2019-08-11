import * as path from "path";
import express from "express";
import socketIo from "socket.io";
import { createServer } from "http";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import { events } from 'app';
import UserController from "controllers/UserController";
import User from "models/User";
import Chat from "models/Chat";
import Message from "./models/Message";

const serverConf = {
  port: process.env.PORT || 80,
  host: '0.0.0.0'
};

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
  UserController.setSockets(socket);
  socket.on(events.createUser, UserController.createOrFindUser);
  // socket.on(events.createChat, ChatCon);
});

http.listen(serverConf, () => {
  console.log(`listening on ${serverConf.host}: ${serverConf.port}`);
});
