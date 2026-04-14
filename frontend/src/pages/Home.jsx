import Tarefas from "../components/Tarefas.jsx";
import NovaTarefa from "../components/NovaTarefa.jsx";
import { useNavigate } from "react-router-dom";
import { useTarefas } from "../hooks/useTarefas.js";

function Home() {
  const navigate = useNavigate();
  const {
    tarefas,
    mudarStatusTarefa,
    deletarTarefa,
    criarTarefa,
  } = useTarefas();

  async function handleDeletarTarefa(tarefa) {
    if (!confirm("Você tem certeza que deseja excluir este item?")) return;
    deletarTarefa(tarefa);
  }

  async function handleNovaTarefaSubmit(titulo, descricao, categoria) {
    if (
      titulo.trim() == "" ||
      descricao.trim() == "" ||
      categoria.trim() == ""
    ) {
      return alert("preencha os campos!");
    }

    criarTarefa(titulo, descricao, categoria);
  }

  async function handleEditarTarefa(tarefa) {
    navigate(`/detalhes?id=${tarefa.id}`);
  }

  return (
    <div className="font-serif!">
      <div>
        <h1 className="text-black text-3xl flex justify-center mt-3 bg-(--main-color) border">
          Tarefas
        </h1>

        <NovaTarefa onNovaTarefaSubmit={handleNovaTarefaSubmit} />

        <div className="w-[80vw] border bg-(--main-color) mt-5 flex flex-col justify-center p-2.5">
          <Tarefas
            tarefas={tarefas}
            onTarefaClick={mudarStatusTarefa}
            onDeleteClick={handleDeletarTarefa}
            onEditClick={handleEditarTarefa}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
