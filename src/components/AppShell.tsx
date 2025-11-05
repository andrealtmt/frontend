import { useState } from "react";
import { Users, PenLine, Menu, X } from "lucide-react";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-slate-50">
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="container-page">
          {/* Mobile Header */}
          <div className="flex items-center justify-between h-14 sm:hidden">
            <a href="/" className="text-base font-semibold text-slate-800">
              Congreso TIC's UTL
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="btn p-2"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {menuOpen && (
            <nav className="sm:hidden border-t border-slate-200 py-3 space-y-2">
              <a
                href="/participantes"
                className="btn w-full justify-start"
                onClick={() => setMenuOpen(false)}
              >
                <Users size={16} />
                Ver Participantes
              </a>
              <a
                href="/registro"
                className="btn btn-primary w-full justify-start"
                onClick={() => setMenuOpen(false)}
              >
                <PenLine size={16} />
                Registrar Nuevo
              </a>
            </nav>
          )}

          {/* Desktop Header */}
          <div className="hidden sm:flex h-16 items-center justify-between">
            <a href="/" className="text-lg font-semibold text-slate-800 hover:text-slate-600 transition-colors">
              Congreso TIC's UTL
            </a>
            <nav className="toolbar-row">
              <a href="/participantes" className="btn">
                <Users size={16} />
                Participantes
              </a>
              <a href="/registro" className="btn btn-primary">
                <PenLine size={16} />
                Registrar
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="container-page py-4 sm:py-8">{children}</main>
      
      <footer className="container-page py-4 sm:py-8 text-xs text-slate-500 border-t border-slate-200 text-center sm:text-left">
        <p className="hidden sm:block">© {new Date().getFullYear()} UTL — Sistema de Registro para Congreso TIC's</p>
        <p className="sm:hidden">© {new Date().getFullYear()} UTL</p>
      </footer>
    </div>
  );
}
