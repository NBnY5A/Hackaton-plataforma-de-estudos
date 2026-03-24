import { randomUUID } from "crypto"
import {sql} from './server.js'

export class Database {

    async create(tarefa) {
        const id = randomUUID()
        const {titulo,descricao,categoria} = tarefa
        await sql`insert into tarefas (id,titulo,descricao,categoria) values (${id},${titulo},${descricao},${categoria})` 
    }

    async list (tituloFiltro) {
        let tarefas

        if (tituloFiltro) {
            console.log(tituloFiltro)
            tarefas = await sql`select * from tarefas where titulo ilike ${'%'+tituloFiltro+'%'}`
        } else {
            tarefas = await sql`select * from tarefas`            
        }

        return tarefas
    }

    async update(id, tarefa) {
        const {titulo,descricao,categoria} = tarefa 

        await sql`update tarefas set titulo=${titulo},categoria=${categoria},descricao=${descricao} where id=${id}`
    }

    async delete(id) {
        await sql`delete from tarefas where id=${id}`
    }

}