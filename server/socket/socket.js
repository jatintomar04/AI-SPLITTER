const { Server } = require("socket.io");

let io;
const onlineUsers = {};

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    

    socket.on("register", (userId) => {
      onlineUsers[userId] = socket.id;
   
    });

    socket.on("disconnect", () => {
      for (const userId in onlineUsers) {
        if (onlineUsers[userId] === socket.id) {
          delete onlineUsers[userId];
        }
      }
    });
  });

  return io;
};

module.exports = {
  initializeSocket,
  onlineUsers,
  getIO: () => io,
};