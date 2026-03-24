import express from 'express'
import 'dotenv/config';
import postgres from 'postgres';
import { Database } from './database-pg.js'

const server = express()
const port = 3000
const database = new Database()

export const sql = postgres(process.env.DATABASE_URL, {ssl: 'require', prepare: false})

server.use(express.json());

server.get('/tarefas', async (req, res) => {
  const filtroTitulo = req.query.titulo
  const tarefas = await database.list(filtroTitulo)

  return res.json(tarefas)
})

server.post('/tarefa', async (req, res) => {
  const {titulo, descricao, categoria} = req.body

  await database.create({
    titulo: titulo,
    descricao: descricao,
    categoria: categoria
  })

  return res.status(201).send()
})

server.put('/tarefa/:id', async (req, res) => {
  const id = req.params.id
  const {titulo, descricao, categoria} = req.body

    const tarefa = await database.update(id,{
        titulo: titulo,
        descricao: descricao,
        categoria: categoria
    })

  return res.status(204).send()
})

server.delete('/tarefa/:id', async (req, res) => {
  const id = req.params.id

  await database.delete(id)

  return res.status(204).send()
})

server.listen(port, () => {
  console.log("Servidor rodando na porta: "+port)
})

