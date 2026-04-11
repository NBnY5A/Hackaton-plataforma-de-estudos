import "dotenv/config";
import { randomUUID } from "crypto";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL, {
  ssl: "require",
  prepare: false,
});

class TarefaRepository {
  async create(tarefa) {
    const id = randomUUID();
    const { titulo, descricao, categoria, finalizada } = tarefa;
    await sql`insert into tarefas (id,titulo,descricao,categoria, finalizada) values (${id},${titulo},${descricao},${categoria},${finalizada})`;
  }

  async list(tituloFiltro) {
    let tarefas;

    if (tituloFiltro) {
      console.log(tituloFiltro);
      tarefas =
        await sql`select * from tarefas where titulo ilike ${"%" + tituloFiltro + "%"} order by titulo`;
    } else {
      tarefas = await sql`select * from tarefas order by titulo`;
    }

    return tarefas;
  }

  async update(id, tarefa) {
    const { titulo, descricao, categoria, finalizada } = tarefa;

    await sql`update tarefas set titulo=${titulo},categoria=${categoria},descricao=${descricao},finalizada=${finalizada} where id=${id}`;
  }

  async delete(id) {
    await sql`delete from tarefas where id=${id}`;
  }
}

export default new TarefaRepository();
