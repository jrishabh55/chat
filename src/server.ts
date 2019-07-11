import * as path from "path";
import express from "express";
import socketIo from "socket.io";
import { createServer } from "http";
import { json, urlencoded } from "body-parser";
import cors from "cors";

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
  socket.on("chat", data => {
    io.emit("chat", data);
  });
});

http.listen(port, () => {
  console.log(`listening on *: ${port}`);
});
