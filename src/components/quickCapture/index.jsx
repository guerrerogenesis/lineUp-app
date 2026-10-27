import { useEffect, useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

const sizes = {
  lg: {
    wrapper: "gap-2 py-1.5 pl-5 pr-1.5",
    input: "h-11 text-[15px]",
    button: "h-12 w-12",
    icon: "h-[22px] w-[22px]",
  },
  sm: {
    wrapper: "gap-1 py-[3px] pl-2.5 pr-[3px]",
    input: "h-8 text-[13px]",
    button: "h-8 w-8",
    icon: "h-4 w-4",
  },
};

/** Campo para anotar un pendiente. Enter o el botón + lo guardan. */
function CaptureInput({ id, onAdd, label, placeholder, size = "lg", accent = false, autoFocus = false, className }) {
  const [text, setText] = useState("");
  const inputRef = useRef(null);
  const s = sizes[size];

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText("");
    inputRef.current?.focus();
  };

  return (
    <form
      onSubmit={onSubmit}
      className={classNames(
        "flex items-center rounded-lu bg-surface",
        accent ? "border-2 border-pink" : "border border-line focus-within:border-pink",
        s.wrapper,
        className
      )}
    >
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        ref={inputRef}
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className={classNames("min-w-0 flex-1 border-0 bg-transparent font-medium text-ink outline-none", s.input)}
      />
      <button
        type="submit"
        aria-label="Guardar pendiente"
        className={classNames("lu-btn flex shrink-0 items-center justify-center rounded-lu bg-pink text-navy", s.button)}
      >
        <PlusIcon className={s.icon} strokeWidth={2.6} />
      </button>
    </form>
  );
}

/** Tarjeta de captura rápida (escritorio). */
function QuickCapture({ onAdd, className }) {
  return (
    <div className={classNames("flex-col gap-5 rounded-card border border-line bg-surface p-7", className)}>
      <div className="flex flex-col gap-2.5">
        <span className="text-[13px] font-bold uppercase tracking-[1.2px] text-muted">Captura rápida</span>
        <h1 className="m-0 text-[38px] font-extrabold leading-[1.08] tracking-[-1.2px]">
          Anótalo antes de que se te olvide
        </h1>
        <p className="m-0 text-[15px] leading-normal text-muted">Sin cuentas: se guarda en tu navegador.</p>
      </div>
      <CaptureInput
        id="new-todo"
        onAdd={onAdd}
        label="Nuevo pendiente"
        placeholder="Ej. Avisar a Ana del update del CRM"
        className="bg-field!"
      />
      <span className="text-xs text-muted">Presiona Enter para guardar</span>
    </div>
  );
}

export { QuickCapture, CaptureInput };
