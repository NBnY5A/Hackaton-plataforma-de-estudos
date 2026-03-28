import styles from "./TaskForm.module.css";
import Button from "../Button/Button";
import { useState } from "react";
import useTaks from "../../hooks/useTasks";

const TaskForm = ({ isLoading }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const { createTask } = useTaks();

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    await createTask({ title, description, category });
    setTitle("");
    setDescription("");
    setCategory("");
  };

  return (
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
  );
};

export default TaskForm;
