import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Input from "../components/Input";
import { useTarefas } from "../hooks/useTarefas.js";

function Detalhes() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();
  const { tarefas, atualizarTarefa } = useTarefas();

  const tarefa = tarefas.find((t) => t.id === id);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    if (tarefa) {
      setTitulo(tarefa.titulo);
      setDescricao(tarefa.descricao);
      setCategoria(tarefa.categoria);
    }
  }, [tarefa]);

  const handleVoltar = () => {
    navigate(-1);
  };

  const handleAtualizarTarefaSubmit = async (tarefa) => {
    console.log(tarefa);
    atualizarTarefa(tarefa);
    navigate(`/`);
  };

  return (
    <div>
      <h1 className="text-black text-3xl flex justify-center mt-3 bg-(--main-color) border">
        Atualizar Tarefa
      </h1>

      <div className="nova-border black bg-(--main-color) w-[80vw] my-5 mx-0 flex flex-col p-2.5 ">
        <label htmlFor="titulo">Título</label>
        <Input
          type="text"
          placeholder="Informe o titulo..."
          name="titulo"
          value={titulo}
          onChange={(event) => {
            setTitulo(event.target.value);
          }}
        />
        <label htmlFor="descricao">Descrição</label>
        <Input
          type="text"
          placeholder="Informe a descricao..."
          name="descricao"
          value={descricao}
          onChange={(event) => {
            setDescricao(event.target.value);
          }}
        />
        <label htmlFor="categorias">Categoria</label>
        <Input
          type="text"
          placeholder="Informe a categoria..."
          name="categoria"
          value={categoria}
          onChange={(event) => {
            setCategoria(event.target.value);
          }}
        />

        <button
          className="mt-5! mb-5! hover:bg-(--hover-color)!"
          onClick={() =>
            handleAtualizarTarefaSubmit({ id, titulo, descricao, categoria })
          }
        >
          Atualizar Tarefa
        </button>

        <button className=" hover:bg-(--hover-color)!" onClick={handleVoltar}>
          Voltar
        </button>
      </div>
    </div>
  );
}

export default Detalhes;
