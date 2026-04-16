import * as tarefaService from "../services/tarefaService.js";

export async function listarTarefas(req, res) {
  const tarefas = await tarefaService.listar(req.query.titulo);
  return res.json(tarefas);
}

export async function criarTarefa(req, res) {
  await tarefaService.criar(req.body);
  return res.status(201).send();
}

export async function atualizarTarefa(req, res) {
  await tarefaService.atualizar(req.params.id, req.body);
  return res.status(204).send();
}

export async function deletarTarefa(req, res) {
  await tarefaService.deletar(req.params.id);
  return res.status(204).send();
}
