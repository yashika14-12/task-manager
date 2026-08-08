import { memo } from 'react';
import { useTasks } from '../context/TaskContext';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'completed', label: 'Completed' },
];

function FilterBar() {
  const { filter, setFilter, stats } = useTasks();

  return (
    <div className="filter-bar" role="tablist" aria-label="Filter tasks">
      {FILTERS.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          role="tab"
          aria-selected={filter === key}
          className={`filter-bar__button${filter === key ? ' filter-bar__button--active' : ''}`}
          onClick={() => setFilter(key)}
        >
          {label}
          <span className="filter-bar__count">
            {key === 'all' ? stats.total : key === 'completed' ? stats.completed : stats.pending}
          </span>
        </button>
      ))}
    </div>
  );
}

export default memo(FilterBar);
