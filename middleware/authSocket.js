const jwt = require("jsonwebtoken");

const verifyTokenSocket = (socket, next) => {
  try {
    let token = socket.handshake.auth?.token;
    socket.user = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    const socketError = new Error("NOT_AUTHORIZED");
    return next(socketError);
  }
  next();
};

module.exports = verifyTokenSocket;
