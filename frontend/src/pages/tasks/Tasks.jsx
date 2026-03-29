import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import styles from "./Tasks.module.css";
import useTaks from "../../hooks/useTasks";
import TaskCard from "../../components/TaskCard/TaskCard";
import { apiRequest } from "../../services/apiService";
import { useTaskFilters } from "../../hooks/useTaskFilters";
import TaskForm from "../../components/TaskForm/TaskForm";
import SideBar from "../../components/SideBar/SideBar";
import TaskHeader from "../../components/TaskHeader/TaskHeader";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";

const Tasks = () => {
  const [userName, setUserName] = useState("Usuário");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { logout } = useAuth();
  const { createTask, tasksList, isLoading, error, deleteTask, updateTask } = useTaks();

  const {
    activeTab,
    setActiveTab,
    categoryFilter,
    setCategoryFilter,
    categories,
    filteredTasks,
  } = useTaskFilters(tasksList);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const userData = await apiRequest("/me");
        setUserName(userData?.name || "Usuário");
      } catch (error) {
        console.error("Falha ao carregar perfil:", error);
        
        if (error.message.includes("401") || error.message.includes("Unauthorized")) {
          handleLogout(); 
        } else {
          setUserName("Usuário");
        }
      }
    };

    loadUserProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getEmptyMessage = () => {
    if (activeTab === "completed") return "Nenhuma tarefa concluída ainda.";
    if (activeTab === "pending") return "Nenhuma tarefa pendente no momento.";
    if (categoryFilter !== "all") return "Nenhuma tarefa nessa categoria.";
    return "Você ainda não possui nenhuma tarefa.";
  };

  return (
    <main className={styles.page}>
      <SideBar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        stats={{
          totalTasks: tasksList.length,
          completedTasks: tasksList.filter((t) => t.completed).length,
          pendingTasks: tasksList.filter((t) => !t.completed).length,
        }}
      />

      <section className={styles.content}>
        <TaskHeader
          userName={userName}
          tasksList={tasksList}
          onLogout={handleLogout}
        />

        {error && <p className={styles.error}>{error}</p>}

        <TaskForm createTask={createTask} isLoading={isLoading} />

        {activeTab === "all" && (
          <CategoryFilter
            categories={categories}
            selectedCategory={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
        )}

        <section className={styles.list}>
          {filteredTasks.length === 0 ? (
            <p className={styles.empty}>{getEmptyMessage()}</p>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={deleteTask}
                onToggleComplete={(t) =>
                  updateTask(t.id, { completed: !t.completed })
                }
                onSaveEdit={updateTask}
                isBusy={isLoading}
              />
            ))
          )}
        </section>
      </section>
    </main>
  );
};

export default Tasks;
