import { useState, useEffect } from "react";
import Tarefas from "./components/Tarefas";
import NovaTarefa from "./components/NovaTarefa";
import { useNavigate } from "react-router-dom";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const navigate = useNavigate();

  // 2. useEffect para o side effect (fetch)
  const fetchtarefas = async () => {
    const response = await fetch("http://localhost:3000/tarefas");

    const json = await response.json();
    json.sort();
    setTarefas(json);
  };

  useEffect(() => {
    fetchtarefas();
  }, []);

  async function onTarefaClick(tarefa) {
    await fetch(`http://localhost:3000/tarefas/${tarefa.id}`, {
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

    await fetch(`http://localhost:3000/tarefas/${tarefa.id}`, {
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

    await fetch(`http://localhost:3000/tarefas`, {
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
    <div className="font-serif!">
      <div>
        <h1 className="text-black text-3xl flex justify-center mt-3 bg-(--main-color) border">
          Tarefas
        </h1>

        <NovaTarefa onNovaTarefaSubmit={onNovaTarefaSubmit} />

        <div className="w-[80vw] border bg-(--main-color) mt-[20px] flex flex-col justify-center p-[10px]">
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
