const socketIo = require("socket.io");
const { connectSocket } = require("./socket.controller");

const connect = (server) => {
  const url = process.env.SOCKET_URL || "http://localhost:3000";
  console.log("aqui");
  const conf = {
    cors: {
      origin: url,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowHeaders: ["Authorization"],
    },
  };
  const io = socketIo(server, conf);

  io.on("connect", connectSocket);
};

module.exports = {
  connect: connect,
};