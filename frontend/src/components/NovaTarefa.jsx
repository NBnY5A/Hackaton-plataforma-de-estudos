import { useState } from "react";

function ListaTarefas(props) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");

  return (
    <div className="nova-tarefa ">
      <label htmlFor="titulo">Título</label>
      <input
        className=""
        value={titulo}
        onChange={(event) => {
          setTitulo(event.target.value);
        }}
        type="text"
        placeholder="Informe o titulo..."
        name="titulo"
      />
      <label htmlFor="descricao">Descrição</label>
      <input
        className=""
        value={descricao}
        onChange={(event) => {
          setDescricao(event.target.value);
        }}
        type="text"
        placeholder="Informe a descricao..."
        name="descricao"
      />
      <label htmlFor="categorias">Categoria</label>
      <input
        className=""
        value={categoria}
        onChange={(event) => {
          setCategoria(event.target.value);
        }}
        type="text"
        placeholder="Informe a categoria..."
        name="categoria"
      />
      <button
        className="btn-nova-tarefa "
        onClick={() => {
          props.onNovaTarefaSubmit(titulo, descricao, categoria);
        }}
      >
        Criar nova tarefa
      </button>
    </div>
  );
}

export default ListaTarefas;
