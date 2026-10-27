import { useState } from "react";
import { CheckIcon, ListBulletIcon, PencilIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import logo from "../../assets/images/ppperspective.png";
import { CaptureInput } from "../quickCapture";
import { CheckButton } from "../todoItem";

/**
 * Contenido de la ventana flotante (Picture-in-Picture).
 * Vista por defecto: capturar. El botón del encabezado cambia a la lista.
 */
function MiniWidget({ todos, onAdd, onToggle }) {
  const [view, setView] = useState("capture");
  const [lastText, setLastText] = useState("");

  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const pending = total - completed;
  const percent = total ? Math.round((completed / total) * 100) : 0;
  const isCapture = view === "capture";
  const sorted = [...todos.filter((todo) => !todo.completed), ...todos.filter((todo) => todo.completed)];
  const toggleView = () => setView(isCapture ? "list" : "capture");
  const summary = pending === 0 ? "Sin pendientes" : pending === 1 ? "1 pendiente" : `${pending} pendientes`;

  const add = (text) => {
    const todo = onAdd(text);
    if (todo) setLastText(todo.text);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-page font-sans text-ink">
      <header className="flex items-center gap-2 border-b border-line p-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center border border-line bg-navy">
          <img src={logo} alt="Line Up" className="h-[23px] w-6 object-contain" />
        </div>
        <span className="min-w-0 flex-1 truncate text-[13px] font-extrabold tracking-[-0.2px]">
          {isCapture ? "Nuevo pendiente" : `${completed} de ${total} hechas`}
        </span>
        <button
          type="button"
          onClick={toggleView}
          aria-label={isCapture ? "Ver pendientes" : "Volver a anotar"}
          title={isCapture ? "Ver pendientes" : "Volver a anotar"}
          className="lu-btn flex h-8 shrink-0 items-center gap-1.5 rounded-lu border border-line bg-surface px-2 text-xs font-bold text-ink"
        >
          {isCapture ? (
            <>
              <ListBulletIcon className="h-4 w-4" />
              <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-lu bg-pink px-1 text-[11px] font-extrabold text-navy">
                {pending}
              </span>
            </>
          ) : (
            <>
              <PencilIcon className="h-4 w-4" />
              Anotar
            </>
          )}
        </button>
      </header>

      {isCapture ? (
        <div className="flex min-h-0 flex-1 flex-col gap-1.5 px-2 pb-2 pt-2.5">
          <label htmlFor="new-todo-mini" className="text-xs font-bold text-muted">
            Anótalo antes de que se te olvide
          </label>
          <CaptureInput
            id="new-todo-mini"
            onAdd={add}
            label="Nuevo pendiente"
            placeholder="Ej. Avisar a Ana del update"
            size="sm"
            accent
            autoFocus
          />
          {lastText ? (
            <div role="status" className="flex items-center gap-1.5 rounded-lu border border-line bg-surface px-2 py-1.5">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-lu bg-pink">
                <CheckIcon className="h-2.5 w-2.5 text-white" strokeWidth={3.4} />
              </span>
              <span className="min-w-0 flex-1 truncate text-xs font-semibold">Guardado: {lastText}</span>
            </div>
          ) : (
            <span className="text-[11px] font-medium text-muted">Enter para guardar</span>
          )}
          <button
            type="button"
            onClick={toggleView}
            className="lu-btn mt-auto h-[30px] rounded-lu border border-dashed border-line bg-transparent text-xs font-semibold text-muted"
          >
            {summary} · ver lista
          </button>
        </div>
      ) : (
        <>
          <div className="mx-2 mt-2 h-[3px] bg-field">
            <div className="h-full bg-pink transition-[width] duration-300" style={{ width: `${percent}%` }} />
          </div>
          <ul className="m-0 flex min-h-0 flex-1 list-none flex-col gap-1 overflow-y-auto p-2">
            {sorted.map((todo) => (
              <li key={todo.id} className="flex min-h-[36px] items-center gap-0.5 rounded-lu border border-line bg-surface pr-2">
                <CheckButton completed={todo.completed} onToggle={() => onToggle(todo.id)} size="sm" />
                <span
                  className={classNames(
                    "min-w-0 flex-1 truncate text-xs font-semibold",
                    todo.completed ? "text-muted line-through" : "text-ink"
                  )}
                >
                  {todo.text}
                </span>
              </li>
            ))}
            {sorted.length === 0 && <li className="px-2 py-4 text-center text-xs text-muted">Todo en orden.</li>}
          </ul>
        </>
      )}
    </div>
  );
}

export { MiniWidget };
