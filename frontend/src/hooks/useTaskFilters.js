import { useState, useMemo } from "react";

export function useTaskFilters(taskList) {
  const [activeTab, setActiveTab] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = useMemo(() => {
    const unique = new Set(
      taskList.map((task) => task.category).filter(Boolean),
    );
    return ["all", ...Array.from(unique)];
  }, [taskList]);

  const filteredTasks = useMemo(() => {
    let list = [...taskList];
    if (activeTab === "completed") list = list.filter((task) => task.completed);
    if (activeTab === "pending") list = list.filter((task) => !task.completed);
    if (activeTab === "all" && categoryFilter !== "all") {
      list = list.filter((task) => task.category === categoryFilter);
    }
    return list;
  }, [taskList, activeTab, categoryFilter]);

  return {
    activeTab,
    setActiveTab,
    categoryFilter,
    setCategoryFilter,
    categories,
    filteredTasks,
  };
}
