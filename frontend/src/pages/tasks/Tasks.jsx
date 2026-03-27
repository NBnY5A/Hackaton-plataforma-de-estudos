import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import styles from "./Tasks.module.css";
import Button from "../../components/Button/Button";
import useTaks from "../../hooks/useTasks";
import TaskCard from "../../components/TaskCard/TaskCard";

const Tasks = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const { logout } = useAuth();
  const { tasksList, isLoading, error, createTask, deleteTask, updateTask } =
    useTaks();
  const navigate = useNavigate();

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    await createTask({ title, description, category });
    setTitle("");
    setDescription("");
    setCategory("");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <main className={styles.container}>
      <div className={styles.topBar}>
        <h1>Minhas Tarefas</h1>
        <Button buttonContent="Sair" onClick={handleLogout} />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <form className={styles.form} onSubmit={handleCreateSubmit}>
        <input
          type="text"
          placeholder="Título da tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Descrição da tarefa"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Qual a categoria dessa tarefa?"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <Button
          type="submit"
          buttonContent={isLoading ? "Aguarde..." : "Adicionar tarefa"}
        />
      </form>

      <section className={styles.list}>
        {tasksList.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onToggleComplete={(t) =>
              updateTask(t.id, { completed: !t.completed })
            }
            onSaveEdit={updateTask}
            isBusy = {isLoading}
          />
        ))}
      </section>
    </main>
  );
};

export default Tasks;
