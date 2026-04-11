import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Input from "../components/Input";

function Detalhes() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { state } = useLocation();
  const tarefa = state.tarefa;
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState(tarefa.titulo);
  const [descricao, setDescricao] = useState(tarefa.descricao);
  const [categoria, setCategoria] = useState(tarefa.categoria);

  function onVoltarClick() {
    navigate(-1);
  }

  async function onAtualizarTarefaClick(titulo, descricao, categoria) {
    console.log(`http://localhost:3000/tarefas/${id}`);
    console.log(titulo, descricao, categoria);
    await fetch(`http://localhost:3000/tarefas/${id}`, {
      method: "PUT",
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

    navigate(`/`);
  }

  return (
    <div>
      <h1 className="text-black text-3xl flex justify-center mt-3 bg-(--main-color) border">
        Atualizar Tarefa
      </h1>

      <div className="nova-border black bg-(--main-color) w-[80vw] my-[20px] mx-0 flex flex-col p-[10px] ">
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
          onClick={() => onAtualizarTarefaClick(titulo, descricao, categoria)}
        >
          Atualizar Tarefa
        </button>

        <button className=" hover:bg-(--hover-color)!" onClick={onVoltarClick}>
          Voltar
        </button>
      </div>
    </div>
  );
}

export default Detalhes;
