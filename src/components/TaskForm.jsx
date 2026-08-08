import { memo, useCallback, useState } from 'react';
import { useTasks } from '../context/TaskContext';

function TaskForm() {
  const { addTask } = useTasks();
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleChange = useCallback(
    (event) => {
      setText(event.target.value);
      if (error) setError('');
    },
    [error],
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const trimmed = text.trim();
      if (!trimmed) {
        setError('Task cannot be empty.');
        return;
      }
      addTask(trimmed);
      setText('');
      setError('');
    },
    [text, addTask],
  );

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="task-form__row">
        <input
          type="text"
          className={`task-form__input${error ? ' task-form__input--error' : ''}`}
          placeholder="What needs to be done?"
          value={text}
          onChange={handleChange}
          aria-label="New task"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'task-form-error' : undefined}
        />
        <button type="submit" className="task-form__submit">
          Add Task
        </button>
      </div>
      {error && (
        <p className="task-form__error" id="task-form-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

export default memo(TaskForm);
