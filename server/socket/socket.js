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
    console.log("✅ User Connected:", socket.id);

    socket.on("register", (userId) => {
      onlineUsers[userId] = socket.id;

      console.log("✅ User Registered:", userId);
      console.log("Online Users:", onlineUsers);
    });

    socket.on("disconnect", () => {
      console.log("❌ User Disconnected:", socket.id);

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