const host = `http://localhost:3000`;

export const buscarTodas = async () => {
  const res = await fetch(`${host}/tarefas`);
  const tarefas = await res.json();
  return tarefas.sort();
};

export const mudarStatus = async (tarefa) => {
  await fetch(`${host}/tarefas/${tarefa.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      categoria: tarefa.categoria,
      finalizada: !tarefa.finalizada,
    }),
  });
};

export const atualizar = async (tarefa) => {
  await fetch(`${host}/tarefas/${tarefa.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      categoria: tarefa.categoria,
      finalizada: false,
    }),
  });
};

export const deletar = async (tarefa) => {
  await fetch(`${host}/tarefas/${tarefa.id}`, {
    method: "DELETE",
  });
};

export const criar = async (titulo, descricao, categoria) => {
  await fetch(`${host}/tarefas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      titulo: titulo,
      descricao: descricao,
      categoria: categoria,
      finalizada: false,
    }),
  });
};
