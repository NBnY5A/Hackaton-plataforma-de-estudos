import express from "express";
import {
  atualizarTarefa,
  criarTarefa,
  deletarTarefa,
  listarTarefas,
} from "../controllers/tarefas.js";

const rotasTarefa = express.Router();

rotasTarefa.get("/tarefas", listarTarefas);

rotasTarefa.post("/tarefas", criarTarefa);

rotasTarefa.put("/tarefas/:id", atualizarTarefa);

rotasTarefa.delete("/tarefas/:id", deletarTarefa);

export default rotasTarefa;
