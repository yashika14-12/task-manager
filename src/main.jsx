import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Note: StrictMode is intentionally omitted. react-beautiful-dnd's
// initialization breaks under StrictMode's double-invoked effects.
createRoot(document.getElementById('root')).render(<App />)
