import { Trash } from "lucide-react";

function Tarefa(props) {
  return (
    <ul>
      {props.tarefas.map((tarefa) => (
        <li key={tarefa.id}>
          <div className="tarefa-item flex">
            <div
              className="tarefa-info"
              onClick={() => {
                props.onTarefaClick(tarefa);
              }}
            >
              <div className="tarefa-tit-desc">
                <div className="tarefa-titulo">
                  <p
                    className={`p-titulo ${tarefa.finalizada && "line-through"}`}
                  >
                    {tarefa.titulo}
                  </p>
                </div>
                <div className="tarefa-descricao">
                  <p
                    className={`p-descricao ${tarefa.finalizada && "line-through"}`}
                  >
                    {tarefa.descricao}
                  </p>
                </div>
              </div>
              <div className="tarefa-categoria">
                <p
                  className={`p-categoria ${tarefa.finalizada && "line-through"}`}
                >
                  {tarefa.categoria}
                </p>
              </div>
            </div>

            <button
              className="hover:bg-[#d6d5a9]!"
              onClick={() => {
                props.onDeleteClick(tarefa);
              }}
            >
              <Trash />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Tarefa;
