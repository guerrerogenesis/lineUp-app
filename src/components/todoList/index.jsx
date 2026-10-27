function TodoList({ children, isEmpty }) {
  if (isEmpty) {
    return (
      <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
        <span className="text-[17px] font-bold">Todo en orden</span>
        <span className="text-sm text-muted">No hay pendientes aquí. Anota uno cuando salga.</span>
      </div>
    );
  }

  return <ul className="m-0 flex list-none flex-col gap-2.5 p-0">{children}</ul>;
}

export { TodoList };
