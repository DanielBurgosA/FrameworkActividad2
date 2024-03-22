import { Routes, BrowserRouter, Route } from 'react-router-dom'
import TodoList from './components/TodoList';
import LoginComponent from './components/LoginComponent';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <TodoList />} />
        <Route path="/login" element={<LoginComponent />} />
      </Routes>
    </BrowserRouter>
  );
}