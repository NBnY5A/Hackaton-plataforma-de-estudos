import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import styles from "./Tasks.module.css";
import Button from "../../components/Button/Button";
import { apiRequest } from "../../services/apiService";

const Tasks = () => {
  const [tasksList, setTasksList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const loadTasks = async () => {
    try {
      setError("");
      const data = await apiRequest("/tasks");
      setTasksList(Array.isArray(data) ? data : data.tasks || []);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      setError("");
      await apiRequest("/tasks", {
        method: "POST",
        body: JSON.stringify({ title, description, category }),
      });
      setTitle("");
      setDescription("");
      setCategory("");
      await loadTasks();
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
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

      <form className={styles.form} onSubmit={handleCreateTask}>
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

        <Button type="submit" buttonContent="Adicionar tarefa" />
      </form>

      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <section className={styles.list}>
          {tasksList.length === 0 ? (
            <p className={styles.empty}>
              Você ainda não possui nenhuma tarefa{" "}
            </p>
          ) : (
            tasksList.map((task) => (
              <article key={task.id} className={styles.taskCard}>
                <h3>{task.title}</h3>
                <p>{description}</p>
                <small>{task.completed ? "Concluída" : "Pendente"}</small>
              </article>
            ))
          )}
        </section>
      )}
    </main>
  );
};

export default Tasks;
