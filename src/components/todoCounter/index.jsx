function TodoCounter({ total, completed }) {
  const pending = total - completed;
  const percent = total ? Math.round((completed / total) * 100) : 0;
  const pendingHint = pending === 0 ? "Nada pendiente, buen trabajo" : pending === 1 ? "Te queda uno" : `Te quedan ${pending}`;

  return (
    <div className="grid grid-cols-2 gap-3 lg:gap-4">
      <div className="flex flex-col gap-2.5 rounded-card bg-pink p-[18px] text-navy lg:min-h-[168px] lg:gap-3.5 lg:p-6">
        <span className="text-[13px] font-bold lg:text-sm">Completadas</span>
        <span className="text-[34px] font-extrabold leading-none tracking-[-1px] lg:text-[44px] lg:tracking-[-1.5px]">
          {completed}
          <span className="text-[17px] opacity-[.55] lg:text-xl">/{total}</span>
        </span>
        <div
          className="mt-auto h-1.5 overflow-hidden rounded-lu bg-navy/20 lg:h-2"
          role="progressbar"
          aria-label="Progreso del día"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="h-full rounded-lu bg-navy transition-[width] duration-300" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <div className="flex flex-col gap-2.5 rounded-card bg-lavender p-[18px] text-navy lg:min-h-[168px] lg:gap-3.5 lg:p-6">
        <span className="text-[13px] font-bold lg:text-sm">Pendientes</span>
        <span className="text-[34px] font-extrabold leading-none tracking-[-1px] lg:text-[44px] lg:tracking-[-1.5px]">{pending}</span>
        <span className="mt-auto text-xs font-semibold lg:text-[13px]">{pendingHint}</span>
      </div>
    </div>
  );
}

export { TodoCounter };
