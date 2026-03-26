import { useState } from "react";

function ListaTarefas(props) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");

  return (
    <div className="nova-tarefa">
      <label htmlFor="titulo">Titulo</label>
      <input
        value={titulo}
        onChange={(event) => {
          setTitulo(event.target.value);
        }}
        type="text"
        placeholder="titulo x"
        name="titulo"
      />
      <label htmlFor="descricao">Descricao</label>
      <input
        value={descricao}
        onChange={(event) => {
          setDescricao(event.target.value);
        }}
        type="text"
        placeholder="descricao x"
        name="descricao"
      />
      <label htmlFor="categorias">Categoria</label>
      <input
        value={categoria}
        onChange={(event) => {
          setCategoria(event.target.value);
        }}
        type="text"
        placeholder="categoria x"
        name="categoria"
      />
      <button
        className="btn-nova-tarefa"
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
