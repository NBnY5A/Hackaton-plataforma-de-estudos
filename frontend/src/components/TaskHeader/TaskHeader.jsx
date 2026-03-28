import styles from "./TaskHeader.module.css";
import Button from "../Button/Button";
const TaskHeader = ({ userName, tasksList, onLogout }) => {
  const totalTasks = tasksList.length;
  const completedTasks = tasksList.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  return (
    /*TODO: Nome do usuário não aparece no header, verificar a função `loadUserProfile`*/
    <header className={styles.header}>
      <div>
        <h1>Olá, {userName}</h1>
        <p>Gerencie suas tarefas com foco e consistência.</p>
      </div>

      <div className={styles.headerActions}>
        <div className={styles.statPill}>Total: {totalTasks}</div>
        <div className={styles.statPill}>Concluídas: {completedTasks}</div>
        <div className={styles.statPill}>Pendentes: {pendingTasks}</div>
        <Button buttonContent="Sair" onClick={onLogout} />
      </div>
    </header>
  );
};

export default TaskHeader;
