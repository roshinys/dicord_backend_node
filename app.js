const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
require("dotenv").config();

const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

//socket
const socketServer = require("./socketServer");

//routes
const authRoutes = require("./routes/authRoute");

app.use("/api/auth", authRoutes);

const server = http.createServer(app);
socketServer.registerSocketServer(server);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(port, () => {
      console.log("server started");
    });
  })
  .catch((err) => {
    console.log(err);
  });
