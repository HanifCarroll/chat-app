const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
});
const PORT = parseInt(process.env.port) || 5000;

let users = [];
const userJoin = ({ id, username, room }) => {
  const user = { id, username, room };
  users.push(user);
  return user;
}
const getCurrentUser = id => users.find(user => user.id === id);
const userLeave = (id) => {
  const user = getCurrentUser(id);
  if (!user) { return; }

  users = users.filter(user => user.id !== id);
  return user;
}
const getRoomUsers = room => users.filter(user => user.room === room);
const formatMessage = (username, message) => ({
  username,
  message,
});

const onChatMessage = socket => message => {
  const user = getCurrentUser(socket.id);
  if (!user) { return; }

  const newMessage = formatMessage(user.username, message);

  io.to(user.room).emit('room.chat', newMessage);
};

const onDisconnect = socket => () => {
  const user = userLeave(socket.id);
  if (!user) { return; }

  io.to(user.room).emit('room.leave', `${user.username} has left the chat.`);
  io.to(user.room).emit('room.users', {
    room: user.room,
    users: getRoomUsers(user.room),
  });
};

io.on('connection', socket => {
  socket.on('room.join', ({ username, room }) => {
    const data = {
      id: socket.id,
      username,
      room,
    };
    const user = userJoin(data);
    socket.join(room);

    socket.emit('room.welcome', `Connected to ${room} as ${username}.`);
    socket.broadcast.to(user.room).emit('room.join', `${username} has joined the chat.`);

    io.to(user.room).emit('room.users', {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  socket.on('room.chat', onChatMessage(socket));
  socket.on('disconnect', onDisconnect(socket));
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
