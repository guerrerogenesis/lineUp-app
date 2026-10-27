import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function TodoSearch({ searchValue, setSearchValue }) {
  return (
    <div className="flex h-11 min-w-[180px] flex-1 items-center gap-2 rounded-lu border border-line bg-surface px-4 text-muted focus-within:border-pink lg:max-w-[260px] lg:bg-transparent">
      <MagnifyingGlassIcon className="h-[18px] w-[18px] shrink-0" />
      <label htmlFor="search-todos" className="sr-only">
        Buscar
      </label>
      <input
        id="search-todos"
        type="search"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder="Buscar"
        className="min-w-0 flex-1 border-0 bg-transparent text-sm text-ink outline-none"
      />
    </div>
  );
}

export { TodoSearch };
