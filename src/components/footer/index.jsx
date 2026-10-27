function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto flex flex-col items-center justify-center gap-x-3.5 gap-y-1 border-line px-8 pb-[104px] pt-3 text-center text-[11px] font-medium text-muted lg:flex-row lg:flex-wrap lg:border-t lg:pb-[18px] lg:pt-3.5 lg:text-xs">
      <span>Desarrollado por Génesis Guerrero · © {year}</span>
      <div className="flex gap-3.5 font-semibold">
        <a href="https://geneg.com.mx" target="_blank" rel="noreferrer" className="no-underline hover:opacity-70">
          Portafolio ↗
        </a>
        <a href="https://www.linkedin.com/in/genesisd-guerrero/" target="_blank" rel="noreferrer" className="no-underline hover:opacity-70">
          LinkedIn ↗
        </a>
      </div>
    </footer>
  );
}

export { Footer };
