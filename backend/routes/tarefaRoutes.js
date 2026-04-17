import { Router } from "express";
import {
  atualizarTarefa,
  criarTarefa,
  deletarTarefa,
  listarTarefas,
} from "../controllers/tarefaController.js";
import tarefaAuth from "../middlewares/tarefaAuth.js";

const rotasTarefa = Router();

rotasTarefa.get("/tarefas", tarefaAuth, listarTarefas);
rotasTarefa.post("/tarefas", tarefaAuth, criarTarefa);
rotasTarefa.put("/tarefas/:id", tarefaAuth, atualizarTarefa);
rotasTarefa.delete("/tarefas/:id", tarefaAuth, deletarTarefa);

export default rotasTarefa;
