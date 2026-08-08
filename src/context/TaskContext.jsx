import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const TaskContext = createContext(null);

let idCounter = 0;
function createId() {
  idCounter += 1;
  return `${Date.now()}-${idCounter}`;
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage('task-manager:tasks', []);
  const [filter, setFilter] = useState('all');

  const addTask = useCallback(
    (text) => {
      setTasks((prev) => [...prev, { id: createId(), text, completed: false }]);
    },
    [setTasks],
  );

  const toggleTask = useCallback(
    (id) => {
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
      );
    },
    [setTasks],
  );

  const deleteTask = useCallback(
    (id) => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    },
    [setTasks],
  );

  // Reorders only the tasks currently visible in `viewIds` (the filtered
  // view the drag happened in), leaving hidden tasks in their original slots.
  const reorderTasks = useCallback(
    (sourceIndex, destinationIndex, viewIds) => {
      setTasks((prev) => {
        const newViewIds = [...viewIds];
        const [movedId] = newViewIds.splice(sourceIndex, 1);
        newViewIds.splice(destinationIndex, 0, movedId);

        const byId = new Map(prev.map((task) => [task.id, task]));
        const viewIdSet = new Set(viewIds);
        let pointer = 0;

        return prev.map((task) => {
          if (!viewIdSet.has(task.id)) return task;
          const nextId = newViewIds[pointer];
          pointer += 1;
          return byId.get(nextId);
        });
      });
    },
    [setTasks],
  );

  const filteredTasks = useMemo(() => {
    if (filter === 'completed') return tasks.filter((task) => task.completed);
    if (filter === 'pending') return tasks.filter((task) => !task.completed);
    return tasks;
  }, [tasks, filter]);

  const stats = useMemo(
    () => ({
      total: tasks.length,
      completed: tasks.filter((task) => task.completed).length,
      pending: tasks.filter((task) => !task.completed).length,
    }),
    [tasks],
  );

  const value = useMemo(
    () => ({
      tasks,
      filteredTasks,
      filter,
      setFilter,
      addTask,
      toggleTask,
      deleteTask,
      reorderTasks,
      stats,
    }),
    [tasks, filteredTasks, filter, addTask, toggleTask, deleteTask, reorderTasks, stats],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
