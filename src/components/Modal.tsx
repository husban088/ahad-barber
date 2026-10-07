import { useEffect, type ReactNode } from "react";
export default function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[60] flex animate-fadein items-center justify-center bg-navy-900/70 p-6 backdrop-blur-sm"
    >
      <div className="w-full max-w-md animate-pop rounded-3xl border border-navy-100 bg-white p-8 shadow-navy-lg">
        {children}
      </div>
    </div>
  );
}
