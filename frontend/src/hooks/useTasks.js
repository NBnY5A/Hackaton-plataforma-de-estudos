import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "../services/apiService";

export default function useTaks() {
    const [tasksList, setTaskList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const loadTasks = useCallback(async () => {
        setIsLoading(true);

        try {
            setError("");
            const data = await apiRequest("/tasks");
            setTaskList(Array.isArray(data) ? data : data.tasks || []);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }

    }, []);

    useEffect(() => {
        loadTasks()
    }, [loadTasks]);

    const createTask = async (payload) => {
        setIsLoading(true);
        try {
            await apiRequest("/tasks", {
                method: "POST",
                body: JSON.stringify(payload),
            })
            await loadTasks();
        }
        catch (error) {
            setError(error.message);
            setIsLoading(false)
        }
    }

    const deleteTask = async (taskId) => {
        setIsLoading(true);
        try {
            await apiRequest(`/tasks/${taskId}`, {
                method: "DELETE"
            })
            await loadTasks();
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    }

    const updateTask = async (taskId, payload) => {
        setIsLoading(true);
        try {
            await apiRequest(`/tasks/${taskId}`, {
                method: "PUT",
                body: JSON.stringify(payload),
            })
            await loadTasks();
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    return {
    tasksList,
    isLoading,
    error,
    loadTasks,
    createTask,
    deleteTask,
    updateTask
  };
}