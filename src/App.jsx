import { ThemeProvider } from './context/ThemeContext';
import { TaskProvider } from './context/TaskContext';
import ThemeToggle from './components/ThemeToggle';
import TaskForm from './components/TaskForm';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <div className="app">
          <header className="app__header">
            <h1 className="app__title">Task Manager</h1>
            <ThemeToggle />
          </header>
          <main className="app__main">
            <TaskForm />
            <FilterBar />
            <TaskList />
          </main>
        </div>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;
