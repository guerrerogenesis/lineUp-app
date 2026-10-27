/** Ícono de "ventana flotante" (Picture-in-Picture). */
export function PictureInPictureIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="15" />
      <rect x="12" y="11" width="7" height="6" className="fill-pink stroke-pink" />
    </svg>
  );
}
