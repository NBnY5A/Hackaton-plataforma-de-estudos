import { useState } from "react";
import styles from "./TaskCard.module.css";

const TaskCard = ({ task, onDelete, onToggleComplete, onSaveEdit, isBusy }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title || "",
    description: task.description || "",
    category: task.category || "",
  });

  const handleSave = async () => {
    await onSaveEdit(task.id, editData);
    setIsEditing(false);
  };

  const handleCancel = async () => {
    setEditData({
      title: task.title || "",
      description: task.description || "",
      category: task.category || "",
    });
    setIsEditing(false);
  };

  return (
    <article className={`${styles.card} ${task.completed ? styles.done : ""}`}>
      {isEditing ? (
        <div className={styles.editForm}>
          <input
            type="text"
            value={editData.title}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Título"
          />
          <textarea
            value={editData.description}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Descrição"
          />
          <input
            type="text"
            value={editData.category}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, category: e.target.value }))
            }
            placeholder="Categoria"
          />

          <div className={styles.actions}>
            <button onClick={handleSave} disabled={isBusy}>
              Salvar
            </button>
            <button
              onClick={handleCancel}
              disabled={isBusy}
              className={styles.ghost}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.header}>
            <h3>{task.title}</h3>
            {task.category && (
              <span className={styles.badge}>{task.category}</span>
            )}
          </div>

          <p className={styles.description}>
            {task.description || "Sem descrição"}
          </p>

          <div className={styles.footer}>
            <small>{task.completed ? "Concluída" : "Pendente"}</small>

            <div className={styles.actions}>
              <button onClick={() => onToggleComplete(task)} disabled={isBusy}>
                {task.completed ? "Reabrir" : "Concluir"}
              </button>
              <button onClick={() => setIsEditing(true)} disabled={isBusy}>
                Editar
              </button>
              <button
                onClick={() => onDelete(task.id)}
                disabled={isBusy}
                className={styles.danger}
              >
                Excluir
              </button>
            </div>
          </div>
        </>
      )}
    </article>
  );
};

export default TaskCard;
