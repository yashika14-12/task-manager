import { useCallback, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';

const REMOVE_ANIMATION_MS = 220;

function TaskList() {
  const { filteredTasks, toggleTask, deleteTask, reorderTasks } = useTasks();
  const [removingIds, setRemovingIds] = useState(() => new Set());

  const handleDelete = useCallback(
    (id) => {
      setRemovingIds((prev) => new Set(prev).add(id));
      setTimeout(() => {
        deleteTask(id);
        setRemovingIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }, REMOVE_ANIMATION_MS);
    },
    [deleteTask],
  );

  const handleDragEnd = useCallback(
    (result) => {
      if (!result.destination) return;
      if (result.destination.index === result.source.index) return;
      const viewIds = filteredTasks.map((task) => task.id);
      reorderTasks(result.source.index, result.destination.index, viewIds);
    },
    [filteredTasks, reorderTasks],
  );

  if (filteredTasks.length === 0) {
    return <p className="task-list__empty">Nothing here. Add a task above!</p>;
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="task-list">
        {(provided) => (
          <ul className="task-list" ref={provided.innerRef} {...provided.droppableProps}>
            {filteredTasks.map((task, index) => (
              <TaskItem
                key={task.id}
                task={task}
                index={index}
                isRemoving={removingIds.has(task.id)}
                onToggle={toggleTask}
                onDelete={handleDelete}
              />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TaskList;
