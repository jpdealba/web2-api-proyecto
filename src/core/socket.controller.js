// const Move = require("../../modules/move/move.model");
// const Game = require("../../modules/game/game.model");
// const { hasWon } = require("./../../gameLogic");

module.exports = {
  connectSocket: (socket) => {
    console.log(`Connection from user ${socket.id}`);

    //Join to a room (game)
    socket.on("join-room", (coin) => {
      console.log(`User ${socket.id} connected to room ${coin}`);
      socket.join(coin);
    });

    //If someone win
    socket.on("transaction-case", (room, id) => {
      console.log(room, id);
    });
  },
};
