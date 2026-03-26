function ListaTarefas() {
  return (
    <div className="nova-tarefa">
      <label htmlFor="titulo">Titulo</label>
      <input type="text" placeholder="titulo" name="titulo" />
      <label htmlFor="descricao">Descricao</label>
      <input type="text" placeholder="descricao" name="descricao" />
      <label htmlFor="categorias">Categoria</label>
      <input type="text" placeholder="categoria" name="categoria" />
      <button
        className="btn-nova-tarefa"
        onClick={() => setLegenda("nova tarefa criada!")}
      >
        Criar nova tarefa
      </button>
    </div>
  );
}

export default ListaTarefas;
