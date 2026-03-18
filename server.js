import express from 'express'
const server = express()
const port = 3000

server.use(express.json());

let tarefas = [
  {
    titulo: "tarefa 1",
    descricao: "descricao da tarefa 1",
    categoria: "estudo"
  },
  {
    titulo: "tarefa 2",
    descricao: "descricao da tarefa 2",
    categoria: "estudo"
  },
  {
    titulo: "tarefa 3",
    descricao: "descricao da tarefa 3",
    categoria: "estudo"
  }  
]

function getTarefaIndexByTitulo (tarefas,titulo) {
  return tarefas.findIndex(tarefa =>
      tarefa.titulo.toLowerCase() === titulo.toLowerCase()
    )
}

server.get('/tarefas', (req, res) => {
  res.json(tarefas)
})

server.post('/tarefa', (req, res) => {
  const tarefaIndex = getTarefaIndexByTitulo(tarefas,req.body.titulo)

 if (tarefaIndex !== -1) {
    res.json({
      "response": "tarefa com esse titulo ja cadastrada"
    })
    return
  }

  tarefas.push(req.body)
    res.json({
      "response": "inserindo tarefa: "+req.body.titulo
    })
})

server.put('/tarefa/:titulo', (req, res) => {
  const tarefaIndex = getTarefaIndexByTitulo(tarefas,req.params.titulo)

 if (tarefaIndex === -1) {
    res.json({
      "response": "tarefa nao encontrada"
    })
    return
  }

  tarefas[tarefaIndex] = {...req.body}

  res.json({
    "response": "atualizando tarefa: "+req.params.titulo,
    "update": tarefas[tarefaIndex]
  })
})

server.delete('/tarefa/:titulo', (req, res) => {
  const tarefaIndex = getTarefaIndexByTitulo(tarefas,req.params.titulo)  

 if (tarefaIndex === -1) {
    res.json({
      "response": "tarefa nao encontrada"
    })
    return
  }

  tarefas.splice(tarefaIndex,1)

  res.json({
    "response": "tarefa deletada: "+req.params.titulo
  })
})

server.listen(port, () => {
  console.log("Servidor rodando na porta: "+port)
})

