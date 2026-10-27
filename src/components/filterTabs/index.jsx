import classNames from "classnames";

const FILTERS = [
  { id: "all", label: "Todas" },
  { id: "open", label: "Pendientes" },
  { id: "done", label: "Hechas" },
];

function FilterTabs({ filter, onChange, counts }) {
  return (
    <div className="flex w-full gap-1 rounded-lu bg-surface p-1 lg:w-auto lg:bg-field" role="group" aria-label="Filtrar pendientes">
      {FILTERS.map(({ id, label }) => {
        const active = filter === id;
        return (
          <button
            key={id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(id)}
            className={classNames(
              "lu-btn h-10 flex-1 rounded-lu px-4 text-sm font-bold lg:flex-none",
              active ? "bg-ink text-page" : "bg-transparent text-muted"
            )}
          >
            {label} <span className="hidden opacity-60 lg:inline">{counts[id]}</span>
          </button>
        );
      })}
    </div>
  );
}

export { FilterTabs };
