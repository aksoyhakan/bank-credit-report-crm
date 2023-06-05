const express = require("express");
const authRouter = require("./auth/authRoutes");
const clientRouter = require("./client/clientRoute");
const dataRouter = require("./data/dataRoutes");
const md = require("./auth/authMiddleware");
const helmet = require("helmet");
const cors = require("cors");

const server = express();
server.use(express.json());
server.use(
  cors({
    origin: "http://localhost:3000",
  })
);
server.use(helmet());

server.use("/auth", authRouter);
server.use("/clients", md.restricted, clientRouter);
server.use("/data", md.restricted, dataRouter);

server.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message });
});

module.exports = server;
