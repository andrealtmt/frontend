import { useEffect, useState } from "react";
import { Search, UserPlus, Briefcase, Twitter } from "lucide-react";
import { apiGet } from "../api/api";
import { resolveMedia } from "../api/api";

type Participante = {
  id: string | number;
  nombre: string;
  apellidos: string;
  email: string;
  twitter: string;
  ocupacion: string;
  avatar: string;
};

export const Participantes = () => {
  const [q, setQ] = useState("");
  const [data, setData] = useState<Participante[] | null>(null);

  useEffect(() => {
    const url = q ? `/api/listado?q=${encodeURIComponent(q)}` : "/api/listado";
    apiGet<Participante[]>(url).then(setData).catch(() => setData([]));
  }, [q]);

  return (
    <section className="space-y-4 sm:space-y-6">
      <header className="flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Participantes</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">Lista de todos los asistentes registrados. Da clic en la tarjeta para ver el gafete.</p>
          </div>
          <a href="/registro" className="btn btn-primary sm:shrink-0 justify-center sm:justify-start">
            <UserPlus size={16} />
            <span className="sm:inline">Registrar Nuevo</span>
          </a>
        </div>

        <div className="card">
          <div className="relative">
            <Search size={16} className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por nombre..."
              className="input pl-10 sm:pl-12 text-sm sm:text-base"
            />
          </div>
        </div>
      </header>

      {!data && (
        <div className="grid-cards">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card-sm space-y-3">
              <div className="skeleton w-full aspect-square" />
              <div className="skeleton h-4 w-3/4" />
              <div className="skeleton h-3 w-1/2" />
              <div className="skeleton h-3 w-1/3" />
            </div>
          ))}
        </div>
      )}

      {data && data.length === 0 && (
        <div className="empty">
          <Search size={48} className="mx-auto mb-3 text-slate-300" />
          <p>No se encontraron participantes que coincidan con tu búsqueda.</p>
        </div>
      )}

      {data && data.length > 0 && (
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {data.map(p => (
            <article key={p.id} className="card-sm space-y-2 sm:space-y-3 hover:scale-[1.02] transition-transform cursor-pointer">
              <button
                onClick={() => (window.location.href = `/gafete/${p.id}`)}
                className="w-full"
                title="Ver gafete"
              >
              <img
                src={resolveMedia(p.avatar)}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = "https://placehold.co/600x600?text=Avatar"; }}
                alt={`${p.nombre} ${p.apellidos}`}
                className="w-full aspect-square object-cover rounded-lg"
              />
              </button>
              <div className="space-y-1.5 sm:space-y-2">
                <h3 className="text-sm sm:text-base font-semibold text-slate-800 line-clamp-2">
                  {p.nombre} {p.apellidos}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-1.5">
                  <Briefcase size={12} className="sm:hidden shrink-0" />
                  <Briefcase size={14} className="hidden sm:block shrink-0" />
                  <span className="line-clamp-1">{p.ocupacion}</span>
                </p>
                <a
                  className="text-xs sm:text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1.5 transition-colors"
                  href={`https://twitter.com/${p.twitter.replace(/^@/, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Twitter size={12} className="sm:hidden shrink-0" />
                  <Twitter size={14} className="hidden sm:block shrink-0" />
                  <span className="truncate">{p.twitter}</span>
                </a>
              </div>
            </article>
          ))}
        </section>
      )}
    </section>
  );
};
