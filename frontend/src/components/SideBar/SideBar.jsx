import styles from "./SideBar.module.css";

import {
  ChevronLeft,
  ChevronRight,
  ListAlt,
  CheckCircleOutline,
  PendingActions,
} from "@mui/icons-material";

const SideBar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  activeTab,
  setActiveTab,
  stats,
}) => {
  return (
    <aside
      className={`${styles.sidebar} ${isSidebarOpen ? styles.open : styles.closed}`}
    >
      <button
        className={styles.collapseBtn}
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        title={isSidebarOpen ? "Recolher menu" : "Expandir menu"}
      >
        {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
      </button>

      <nav className={styles.nav}>
        <button
          className={`${styles.navItem} ${activeTab === "all" ? styles.active : ""}`}
          onClick={() => {
            setActiveTab("all");
          }}
        >
          <div className={styles.navLabel}>
            <ListAlt fontSize="small" />
            {isSidebarOpen && <span>Todas</span>}
          </div>
          {isSidebarOpen && <strong>{stats.totalTasks}</strong>}
        </button>

        <button
          className={`${styles.navItem} ${activeTab === "completed" ? styles.active : ""}`}
          onClick={() => setActiveTab("completed")}
        >
          <div className={styles.navLabel}>
            <CheckCircleOutline fontSize="small" />
            {isSidebarOpen && <span>Concluídas</span>}
          </div>
          {isSidebarOpen && <strong>{stats.completedTasks}</strong>}
        </button>

        <button
          className={`${styles.navItem} ${activeTab === "pending" ? styles.active : ""}`}
          onClick={() => setActiveTab("pending")}
        >
          <div className={styles.navLabel}>
            <PendingActions fontSize="small" />
            {isSidebarOpen && <span>Pendentes</span>}
          </div>
          {isSidebarOpen && <strong>{stats.pendingTasks}</strong>}
        </button>
      </nav>
    </aside>
  );
};

export default SideBar;
