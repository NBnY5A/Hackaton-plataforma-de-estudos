import { Trash, Pencil } from "lucide-react";

function Tarefa(props) {
  return (
    <ul>
      {props.tarefas.map((tarefa) => (
        <li key={tarefa.id}>
          <div className="bg-white border black flex mb-2.5 min-h-0 min-w-0 cursor-pointer">
            <div
              className="flex min-h-0 min-w-0 w-full h-full hover:bg-(--hover-color)!"
              onClick={() => props.onTarefaClick(tarefa)}
            >
              <div className="flex flex-col flex-3 min-w-0">
                <div className="m-0 border black overflow-hidden flex-2 p-1.25 wrap-break-word">
                  <p
                    className={`p-titulo ${tarefa.finalizada && "line-through"}`}
                  >
                    {tarefa.titulo}
                  </p>
                </div>
                <div className="m-0 border black overflow-hidden flex-2 px-2.5 py-1.25 wrap-break-word">
                  <p
                    className={`p-descricao ${tarefa.finalizada && "line-through"}`}
                  >
                    {tarefa.descricao}
                  </p>
                </div>
              </div>
              <div className="border overflow-hidden flex flex-1 items-center justify-center min-w-0 wrap-break-word m-0">
                <p
                  className={`p-categoria ${tarefa.finalizada && "line-through"}`}
                >
                  {tarefa.categoria}
                </p>
              </div>
            </div>

            <button
              className="hover:bg-(--hover-color)!"
              onClick={() => props.onDeleteClick(tarefa)}
            >
              <Trash />
            </button>

            <button
              className="hover:bg-(--hover-color)!"
              onClick={() => props.onEditClick(tarefa)}
            >
              <Pencil />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Tarefa;
