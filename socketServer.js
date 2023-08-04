const socketIO = require("socket.io");
const verifyTokenSocket = require("./middleware/authSocket");

const registerSocketServer = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.use((socket, next) => {
    verifyTokenSocket(socket, next);
  });

  io.on("connection", (socket) => {
    console.log("user is connected");
    console.log(socket.id);

    //new connection handler
  });
};

module.exports = {
  registerSocketServer,
};
