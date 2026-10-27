import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { CheckIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { formatCreatedAt } from "../../utils/date";

/** Casilla cuadrada de completado (se usa también en el modo mini). */
function CheckButton({ completed, onToggle, size = "md" }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={completed ? "Marcar como pendiente" : "Marcar como hecha"}
      className={classNames(
        "lu-btn flex shrink-0 items-center justify-center bg-transparent p-0",
        size === "sm" ? "h-[34px] w-[34px]" : "h-11 w-11"
      )}
    >
      <span
        className={classNames(
          "flex items-center justify-center rounded-lu border-2 transition-colors",
          size === "sm" ? "h-4 w-4" : "h-[26px] w-[26px] lg:h-7 lg:w-7",
          completed ? "border-pink bg-pink" : "border-muted bg-transparent"
        )}
      >
        {completed && <CheckIcon className={classNames("text-white", size === "sm" ? "h-2.5 w-2.5" : "h-4 w-4")} strokeWidth={3.2} />}
      </span>
    </button>
  );
}

function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const { text, completed, createdAt } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(text);
  const inputRef = useRef(null);
  const time = formatCreatedAt(createdAt);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const startEditing = () => {
    setDraft(text);
    setIsEditing(true);
  };

  const save = (event) => {
    event.preventDefault();
    if (draft.trim() && draft !== text) onUpdate(draft);
    setIsEditing(false);
  };

  return (
    <li className="group flex min-h-[68px] items-center gap-2 rounded-lu border border-line bg-surface py-2 pl-2 pr-1.5 lg:min-h-[72px] lg:gap-3.5 lg:border-transparent lg:bg-row lg:py-3 lg:pl-3.5 lg:pr-3">
      <CheckButton completed={completed} onToggle={onToggle} />

      {isEditing ? (
        <form onSubmit={save} className="flex min-w-0 flex-1 items-center gap-2">
          <label htmlFor={`edit-${todo.id}`} className="sr-only">
            Editar texto
          </label>
          <input
            id={`edit-${todo.id}`}
            ref={inputRef}
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => event.key === "Escape" && setIsEditing(false)}
            className="h-11 min-w-0 flex-1 border-0 border-b-2 border-pink bg-transparent text-[15px] font-semibold text-ink outline-none"
          />
          <button type="submit" className="lu-btn h-11 rounded-lu bg-pink px-[18px] text-sm font-bold text-navy">
            Guardar
          </button>
        </form>
      ) : (
        <>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <span
              className={classNames(
                "break-words text-[15px] font-semibold leading-snug",
                completed ? "text-muted line-through" : "text-ink"
              )}
            >
              {text}
            </span>
            {time && <span className="text-xs font-semibold text-muted">{time}</span>}
          </div>

          <div className="flex gap-1 transition-opacity lg:opacity-[.55] lg:group-focus-within:opacity-100 lg:group-hover:opacity-100">
            <button
              type="button"
              onClick={startEditing}
              aria-label="Editar pendiente"
              className="lu-btn flex h-11 w-11 items-center justify-center rounded-lu text-ink"
            >
              <PencilIcon className="h-[18px] w-[18px]" />
            </button>
            <button
              type="button"
              onClick={onDelete}
              aria-label="Eliminar pendiente"
              className="lu-btn flex h-11 w-11 items-center justify-center rounded-lu text-danger"
            >
              <TrashIcon className="h-[18px] w-[18px]" />
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export { TodoItem, CheckButton };
