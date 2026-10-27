import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "todos";

const createId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;

const defaultTodos = () => {
  const now = Date.now();
  return [
    { id: createId(), text: "Avisar a Ana del update del CRM", completed: false, createdAt: now - 5 * 60 * 1000 },
    { id: createId(), text: "Crear cuenta para nuevos usuarios", completed: false, createdAt: now - 50 * 60 * 1000 },
    { id: createId(), text: "Revisar propuestas de nueva landing", completed: true, createdAt: now - 20 * 60 * 60 * 1000 },
  ];
};

function readTodos() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // localStorage no disponible (modo privado, bloqueado, etc.)
  }
  return defaultTodos();
}

/**
 * Estado de los pendientes persistido en localStorage.
 * Escucha el evento `storage` para mantenerse sincronizado entre pestañas.
 */
export function useTodos() {
  const [todos, setTodos] = useState(readTodos);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      // Sin persistencia: la app sigue funcionando en memoria
    }
  }, [todos]);

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key !== STORAGE_KEY || !event.newValue) return;
      try {
        setTodos(JSON.parse(event.newValue));
      } catch {
        // valor corrupto: se ignora
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addTodo = useCallback((text) => {
    const clean = text.trim();
    if (!clean) return null;
    const todo = { id: createId(), text: clean, completed: false, createdAt: Date.now() };
    setTodos((prev) => [todo, ...prev]);
    return todo;
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const updateTodo = useCallback((id, text) => {
    const clean = text.trim();
    if (!clean) return;
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, text: clean } : todo)));
  }, []);

  return { todos, addTodo, toggleTodo, deleteTodo, updateTodo };
}
