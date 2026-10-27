import { useCallback, useEffect, useState } from "react";

export const isPictureInPictureSupported =
  typeof window !== "undefined" && "documentPictureInPicture" in window;

/** Copia las hojas de estilo de la página a la ventana flotante. */
function copyStyles(targetWindow) {
  [...document.styleSheets].forEach((sheet) => {
    try {
      const style = targetWindow.document.createElement("style");
      style.textContent = [...sheet.cssRules].map((rule) => rule.cssText).join("\n");
      targetWindow.document.head.appendChild(style);
    } catch {
      // Hojas de otro origen (p. ej. Google Fonts): se enlazan en vez de copiarse
      if (!sheet.href) return;
      const link = targetWindow.document.createElement("link");
      link.rel = "stylesheet";
      link.href = sheet.href;
      targetWindow.document.head.appendChild(link);
    }
  });
}

/**
 * Abre una ventana "siempre encima" con la Document Picture-in-Picture API
 * (Chrome / Edge 116+). Devuelve la ventana para montar un portal de React en ella.
 */
export function usePictureInPicture({ width = 260, height = 240, title = "Line Up" } = {}) {
  const [pipWindow, setPipWindow] = useState(null);

  const open = useCallback(async () => {
    if (!isPictureInPictureSupported) return;

    const current = window.documentPictureInPicture.window;
    if (current) {
      current.focus();
      return;
    }

    try {
      const pip = await window.documentPictureInPicture.requestWindow({ width, height });
      copyStyles(pip);
      pip.document.title = title;
      pip.addEventListener("pagehide", () => setPipWindow(null), { once: true });
      setPipWindow(pip);
    } catch (error) {
      console.error("No se pudo abrir el modo mini", error);
    }
  }, [width, height, title]);

  const close = useCallback(() => pipWindow?.close(), [pipWindow]);

  // Cierra la ventana flotante si la app se desmonta
  useEffect(() => () => window.documentPictureInPicture?.window?.close(), []);

  return { pipWindow, open, close, isSupported: isPictureInPictureSupported };
}
