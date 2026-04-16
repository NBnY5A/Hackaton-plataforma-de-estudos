import { Tarefa } from "../models/tarefaModel.js";
import { sql } from "../db/pg.js";

class TarefaRepository {
  async create(tarefa) {
    const novaTarefa = new Tarefa(tarefa);
    await sql`insert into tarefas (id,titulo,descricao,categoria, finalizada) values (${novaTarefa.id},${novaTarefa.titulo},${novaTarefa.descricao},${novaTarefa.categoria},${novaTarefa.finalizada})`;
    return novaTarefa;
  }

  async list(tituloFiltro) {
    let results;
    if (tituloFiltro) {
      results =
        await sql`select * from tarefas where titulo ilike ${"%" + tituloFiltro + "%"} order by titulo`;
    } else {
      results = await sql`select * from tarefas order by titulo`;
    }

    return results.map((result) => new Tarefa(result));
  }

  async update(id, tarefa) {
    const tarefaAtualizada = new Tarefa({ id, ...tarefa });
    await sql`update tarefas set titulo=${tarefaAtualizada.titulo},categoria=${tarefaAtualizada.categoria},descricao=${tarefaAtualizada.descricao},finalizada=${tarefaAtualizada.finalizada} where id=${tarefaAtualizada.id}`;
    return tarefaAtualizada;
  }

  async delete(id) {
    await sql`delete from tarefas where id=${id}`;
  }
}

export default new TarefaRepository();
