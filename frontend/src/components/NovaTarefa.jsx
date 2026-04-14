import { useState } from "react";
import Input from "./Input";

function ListaTarefas(props) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");

  return (
    <div className="border black bg-(--main-color) w-[80vw] my-[20px] mx-0 flex flex-col p-[10px]">
      <label htmlFor="titulo">Título</label>
      <Input
        onChange={(event) => {
          setTitulo(event.target.value);
        }}
        value={titulo}
        type="text"
        placeholder="Informe o titulo..."
        name="titulo"
      />
      <label htmlFor="descricao">Descrição</label>
      <Input
        onChange={(event) => {
          setDescricao(event.target.value);
        }}
        value={descricao}
        type="text"
        placeholder="Informe a descricao..."
        name="descricao"
      />
      <label htmlFor="categorias">Categoria</label>
      <Input
        onChange={(event) => {
          setCategoria(event.target.value);
        }}
        value={categoria}
        type="text"
        placeholder="Informe a categoria..."
        name="categoria"
      />
      <button
        className="bg-white p-2.5 cursor-pointer border black mt-5 hover:bg-(--hover-color)!"
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
