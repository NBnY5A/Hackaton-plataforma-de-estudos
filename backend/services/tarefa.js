import tarefaRepository from "../repositories/tarefa.js";

function validarTarefa(tarefa) {
  if (!tarefa.titulo?.trim()) {
    const erro = new Error("Título é obrigatório");
    erro.status = 400;
    throw erro;
  }

  if (!tarefa.descricao?.trim()) {
    const erro = new Error("Descricao é obrigatória");
    erro.status = 400;
    throw erro;
  }

  if (!tarefa.categoria?.trim()) {
    const erro = new Error("Categoria é obrigatória");
    erro.status = 400;
    throw erro;
  }
}

export async function listar(filtroTitulo) {
  return await tarefaRepository.list(filtroTitulo);
}

export async function criar(body) {
  const { titulo, descricao, categoria, finalizada } = body;

  validarTarefa(body);

  await tarefaRepository.create({
    titulo: titulo,
    descricao: descricao,
    categoria: categoria,
    finalizada: finalizada,
  });
}

export async function atualizar(id, body) {
  const { titulo, descricao, categoria, finalizada } = body;
  validarTarefa(body);
  await tarefaRepository.update(id, {
    titulo: titulo,
    descricao: descricao,
    categoria: categoria,
    finalizada: finalizada,
  });
}

export async function deletar(id) {
  await tarefaRepository.delete(id);
}
