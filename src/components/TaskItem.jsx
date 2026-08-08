import { memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';

function TaskItem({ task, index, isRemoving, onToggle, onDelete }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={[
            'task-item',
            task.completed && 'task-item--completed',
            snapshot.isDragging && 'task-item--dragging',
            isRemoving && 'task-item--removing',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <span
            className="task-item__handle"
            {...provided.dragHandleProps}
            aria-label="Drag to reorder task"
          >
            ⠿
          </span>
          <label className="task-item__label">
            <input
              type="checkbox"
              className="task-item__checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
            />
            <span className="task-item__text">{task.text}</span>
          </label>
          <button
            type="button"
            className="task-item__delete"
            onClick={() => onDelete(task.id)}
            aria-label={`Delete task: ${task.text}`}
          >
            ✕
          </button>
        </li>
      )}
    </Draggable>
  );
}

export default memo(TaskItem);
