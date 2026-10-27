import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/images/ppperspective.png";
import { PictureInPictureIcon } from "../icons";
import { formatToday } from "../../utils/date";

function Header({ isDark, onToggleTheme, canOpenMini, onOpenMini }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-line bg-navy lg:h-16 lg:w-16">
        <img src={logo} alt="Line Up" className="h-[46px] w-12 object-contain lg:h-[54px] lg:w-14" />
      </div>

      <div className="flex items-center gap-2.5">
        <span className="hidden h-11 items-center rounded-lu border border-line bg-surface px-[18px] text-sm font-semibold lg:inline-flex">
          {formatToday()}
        </span>

        {canOpenMini && (
          <button
            type="button"
            onClick={onOpenMini}
            title="Abre una ventana flotante que se queda encima de tu llamada"
            className="lu-btn hidden h-11 items-center gap-2 rounded-lu border border-line bg-navy px-4 text-sm font-bold text-white lg:inline-flex"
          >
            <PictureInPictureIcon className="h-[18px] w-[18px]" />
            Modo mini
          </button>
        )}

        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
          className="lu-btn flex h-11 w-11 items-center justify-center rounded-lu border border-line bg-surface text-ink"
        >
          {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </button>
      </div>
    </header>
  );
}

export { Header };
