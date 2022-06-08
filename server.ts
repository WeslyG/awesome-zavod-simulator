import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import fs from 'fs';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/dist/` + '/index.html');
});

app.use(express.static('dist'));

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('message', (msg) => {
    console.log(msg);
    fs.appendFileSync('output.txt', `${msg}\n`);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on 3000');
});
