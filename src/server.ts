import * as path from "path";
import express from "express";
import socketIo from "socket.io";
import { createServer } from "http";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import app from 'app';
import UserController from "controllers/UserController";
import ChatController from "controllers/ChatController";

const serverConf = {
  port: process.env.PORT || 80,
  host: '0.0.0.0'
};

const server = express();
server.use(json());
server.use(urlencoded({ extended: false }));
server.use(cors());

const http = createServer(server);
const io = socketIo(http);

server.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

io.on("connection", socket => {
  const { events } = app;
  app.setSockets(socket);
  app.setIo(io);
  socket.on(events.createUser, UserController.createOrFindUser);
  socket.on(events.createChat, ChatController.create);
});

http.listen(serverConf, () => {
  console.log(`listening on ${serverConf.host}: ${serverConf.port}`);
});
