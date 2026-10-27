import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import "./css/App.css";
import { Header } from "./components/header";
import { QuickCapture, CaptureInput } from "./components/quickCapture";
import { TodoCounter } from "./components/todoCounter";
import { FilterTabs } from "./components/filterTabs";
import { TodoSearch } from "./components/todoSearch";
import { TodoList } from "./components/todoList";
import { TodoItem } from "./components/todoItem";
import { Footer } from "./components/footer";
import { MiniWidget } from "./components/miniWidget";
import { useTodos } from "./hooks/useTodos";
import { useTheme } from "./hooks/useTheme";
import { usePictureInPicture } from "./hooks/usePictureInPicture";
import { formatToday } from "./utils/date";

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo } = useTodos();
  const { isDark, toggleTheme } = useTheme();
  const { pipWindow, open: openMini, isSupported: canOpenMini } = usePictureInPicture({ width: 260, height: 240 });
  const [filter, setFilter] = useState("all");
  const [searchValue, setSearchValue] = useState("");

  // La ventana flotante sigue el tema de la página
  useEffect(() => {
    pipWindow?.document.documentElement.classList.toggle("dark", isDark);
  }, [pipWindow, isDark]);

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;
  const counts = { all: totalCount, open: totalCount - completedCount, done: completedCount };

  const visibleTodos = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    return todos.filter((todo) => {
      const matchesFilter = filter === "all" || (filter === "open" ? !todo.completed : todo.completed);
      return matchesFilter && (!query || todo.text.toLowerCase().includes(query));
    });
  }, [todos, filter, searchValue]);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-5 px-5 pb-6 pt-6 lg:gap-8 lg:px-8 lg:pb-10 lg:pt-8">
        <Header isDark={isDark} onToggleTheme={toggleTheme} canOpenMini={canOpenMini} onOpenMini={openMini} />

        {/* Encabezado móvil */}
        <div className="flex flex-col gap-1.5 lg:hidden">
          <span className="text-[13px] font-semibold text-muted">{formatToday()}</span>
          <h1 className="m-0 text-3xl font-extrabold leading-[1.1] tracking-[-1px]">Tus pendientes de hoy</h1>
        </div>

        <main className="flex flex-wrap items-start gap-5 lg:gap-6">
          <section className="flex min-w-0 max-w-full flex-[1_1_340px] flex-col gap-4">
            <QuickCapture onAdd={addTodo} className="hidden lg:flex" />
            <TodoCounter total={totalCount} completed={completedCount} />
          </section>

          <section className="flex min-w-0 flex-[999_1_560px] flex-col gap-4 lg:gap-[18px] lg:rounded-card lg:border lg:border-line lg:bg-surface lg:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <FilterTabs filter={filter} onChange={setFilter} counts={counts} />
              <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
            </div>

            <TodoList isEmpty={visibleTodos.length === 0}>
              {visibleTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={() => toggleTodo(todo.id)}
                  onDelete={() => deleteTodo(todo.id)}
                  onUpdate={(text) => updateTodo(todo.id, text)}
                />
              ))}
            </TodoList>
          </section>
        </main>
      </div>

      <Footer />

      {/* Barra de captura móvil, al alcance del pulgar */}
      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-line bg-page px-4 pb-6 pt-3.5 lg:hidden">
        <CaptureInput id="new-todo-mobile" onAdd={addTodo} label="Nuevo pendiente" placeholder="Anota algo rápido…" />
      </div>

      {pipWindow &&
        createPortal(<MiniWidget todos={todos} onAdd={addTodo} onToggle={toggleTodo} />, pipWindow.document.body)}
    </div>
  );
}

export default App;
