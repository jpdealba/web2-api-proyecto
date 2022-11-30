// const Move = require("../../modules/move/move.model");
// const Game = require("../../modules/game/game.model");
// const { hasWon } = require("./../../gameLogic");

module.exports = {
  connectSocket: (socket) => {
    console.log(`Connection from user ${socket.id}`);

    //Join to a room (coin)
    socket.on("join-room", (coin) => {
      console.log(`User ${socket.id} connected to room ${coin}`);
      socket.join(coin);
    });

    //If someone make a transaction
    socket.on("transaction-case", (room, data) => {
      socket.to(room).emit("transaction-case", data);
    });
  },
};
