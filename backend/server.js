import "dotenv/config";
import express from "express";
import cors from "cors";
import rotasTarefa from "./routes/tarefaRoutes.js";
import rotasAuth from "./routes/authRoutes.js";

const server = express();
const port = 3000;

server.use(express.json());
server.use(cors());
server.use("/", rotasTarefa);
server.use("/", rotasAuth);
server.use((err, req, res, next) => {
  const status = err.status || 500;
  return res.status(status).json({ erro: err.message });
});

server.listen(port, () => {
  console.log("Servidor rodando na porta: " + port);
});
