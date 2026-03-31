import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

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
    navigate(`/`);
  }

  async function onAtualizarTarefaClick(titulo, descricao, categoria) {
    await fetch(`http://localhost:3000/tarefa/${id}`, {
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

    //fetchtarefas();
    navigate(`/`);
  }

  return (
    <div className="nova-tarefa ">
      <label htmlFor="titulo">Título</label>
      <input
        className=""
        type="text"
        placeholder="Informe o titulo..."
        name="titulo"
        value={titulo}
        onChange={(event) => {
          setTitulo(event.target.value);
        }}
      />
      <label htmlFor="descricao">Descrição</label>
      <input
        className=""
        type="text"
        placeholder="Informe a descricao..."
        name="descricao"
        value={descricao}
        onChange={(event) => {
          setDescricao(event.target.value);
        }}
      />
      <label htmlFor="categorias">Categoria</label>
      <input
        className=""
        type="text"
        placeholder="Informe a categoria..."
        name="categoria"
        value={categoria}
        onChange={(event) => {
          setCategoria(event.target.value);
        }}
      />

      <button
        className="mt-5! mb-5! hover:bg-[#d6d5a9]!"
        onClick={() => onAtualizarTarefaClick(titulo, descricao, categoria)}
      >
        Atualizar Tarefa
      </button>

      <button
        className=" hover:bg-[#d6d5a9]!"
        onClick={() => {
          onVoltarClick();
        }}
      >
        Voltar
      </button>
    </div>
  );
}

export default Detalhes;
