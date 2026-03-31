import { useState, useEffect } from "react";
import Tarefas from "./components/Tarefas";
import NovaTarefa from "./components/NovaTarefa";
import { useNavigate } from "react-router-dom";

function App() {
  // 1. Estados para armazenar os dados, carregamento e erros
  const [tarefas, setTarefas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 2. useEffect para o side effect (fetch)
  // Definindo a função assíncrona dentro do efeito
  const fetchtarefas = async () => {
    try {
      setLoading(true); // Inicia o loading
      const response = await fetch("http://localhost:3000/tarefas");

      // Verifica se a resposta foi bem sucedida (status 200-299)
      if (!response.ok) {
        throw new Error(`Erro HTTP! status: ${response.status}`);
      }

      const json = await response.json(); // Converte para JSON
      json.sort();
      setTarefas(json); // Define o estado com os dados
    } catch (err) {
      setError(err.message); // Captura erros
    } finally {
      setLoading(false); // Finaliza o loading
    }
  };

  useEffect(
    () => {
      fetchtarefas();
    },

    [], // Array de dependências vazio significa: rodar apenas uma vez na montagem
  );

  // 3. Renderização Condicional
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Carregando...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        Erro: {error}
      </div>
    );

  async function onTarefaClick(tarefa) {
    await fetch(`http://localhost:3000/tarefa/${tarefa.id}`, {
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

    fetchtarefas();
  }

  async function onDeleteClick(tarefa) {
    if (!confirm("Você tem certeza que deseja excluir este item?")) return;

    await fetch(`http://localhost:3000/tarefa/${tarefa.id}`, {
      method: "DELETE",
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

    fetchtarefas();
  }

  async function onNovaTarefaSubmit(titulo, descricao, categoria) {
    if (
      titulo.trim() == "" ||
      descricao.trim() == "" ||
      categoria.trim() == ""
    ) {
      return alert("preencha os campos!");
    }

    await fetch(`http://localhost:3000/tarefa`, {
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

    fetchtarefas();
  }

  async function onEditClick(tarefa) {
    navigate(`/detalhes?id=${tarefa.id}`, { state: { tarefa } });
  }

  return (
    <div className="">
      <div className="tarefas">
        <h1 className="text-white text-3xl font-mono text-al">Tarefas</h1>

        <NovaTarefa onNovaTarefaSubmit={onNovaTarefaSubmit} />

        <div className="lista-tarefas">
          <Tarefas
            tarefas={tarefas}
            onTarefaClick={onTarefaClick}
            onDeleteClick={onDeleteClick}
            onEditClick={onEditClick}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
