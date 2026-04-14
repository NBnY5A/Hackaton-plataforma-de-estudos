import { useState, useEffect } from "react";
import * as serviceTarefas from "../services/tarefa.js";

export function useTarefas() {
  const [tarefas, setTarefas] = useState([]);

  const refreshTodasTarefas = async () => {
    setTarefas(await serviceTarefas.buscarTodas());
  };

  const mudarStatusTarefa = async (tarefa) => {
    await serviceTarefas.mudarStatus(tarefa);
    refreshTodasTarefas();
  };

  const atualizarTarefa = async (tarefa) => {
    await serviceTarefas.atualizar(tarefa);
    refreshTodasTarefas();
  };

  const deletarTarefa = async (tarefa) => {
    await serviceTarefas.deletar(tarefa);
    refreshTodasTarefas();
  };

  const criarTarefa = async (titulo, descricao, categoria) => {
    await serviceTarefas.criar(titulo, descricao, categoria);
    refreshTodasTarefas();
  };

  useEffect(() => {
    refreshTodasTarefas();
  }, []);

  return {
    tarefas,
    refreshTodasTarefas,
    mudarStatusTarefa,
    atualizarTarefa,
    deletarTarefa,
    criarTarefa,
  };
}
