import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Printer, IdCard, QrCode, Mail, Twitter, Briefcase, ArrowLeft, MapPin, Calendar, Hash } from "lucide-react";
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

export const Gafete = () => {
  const { id } = useParams();
  const [p, setP] = useState<Participante | null>(null);

  useEffect(() => {
    apiGet<Participante>(`/api/participante/${id}`).then(setP).catch(() => setP(null));
  }, [id]);

  if (!p) return (
    <div className="empty">
      <IdCard size={48} className="mx-auto mb-3 text-slate-300" />
      <p>Cargando información del participante...</p>
    </div>
  );

  return (
    <section className="space-y-4 sm:space-y-6">
      <header className="flex flex-col gap-3 sm:gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <IdCard size={22} className="sm:hidden" />
            <IdCard size={28} className="hidden sm:block" />
            Gafete de Participante
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">Vista previa e impresión del gafete</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button className="btn order-2 sm:order-1 justify-center sm:justify-start" onClick={() => history.back()}>
            <ArrowLeft size={14} className="sm:hidden" />
            <ArrowLeft size={16} className="hidden sm:inline" />
            Volver
          </button>
          <button className="btn btn-primary flex-1 sm:flex-initial order-1 sm:order-2 justify-center sm:justify-start" onClick={() => window.print()}>
            <Printer size={14} className="sm:hidden" />
            <Printer size={16} className="hidden sm:inline" />
            Imprimir
          </button>
        </div>
      </header>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 print:grid-cols-2">
        {/* Frontal */}
        <article className="card overflow-hidden flex flex-col justify-between">
          {/* Header */}
          <div className="bg-linear-to-br from-slate-700 to-slate-900 p-4 sm:p-6 text-white">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <IdCard size={16} className="sm:hidden" />
                <IdCard size={20} className="hidden sm:block" />
                <span className="text-xs sm:text-sm font-medium">PARTICIPANTE</span>
              </div>
              <div className="flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded">
                <Hash size={10} className="sm:hidden" />
                <Hash size={12} className="hidden sm:block" />
                <span className="text-xs">{String(p.id).slice(0, 8)}</span>
              </div>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold">Congreso TIC's</h3>
            <p className="text-xs sm:text-sm text-slate-300">Universidad Tecnológica de León</p>
          </div>

          {/* Contenido principal */}
          <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 flex-1">
            <div className="flex gap-3 sm:gap-4">
              <img
                src={resolveMedia(p.avatar)}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = "https://placehold.co/600x600?text=Avatar"; }}
                alt={`${p.nombre} ${p.apellidos}`}
                className="w-50 h-50 sm:w-50 sm:h-50 object-cover rounded-lg ring-2 sm:ring-4 ring-slate-200 shrink-0"
              />
              <div className="flex-1 space-y-1 min-w-0">
                <p className="text-base sm:text-xl font-bold text-slate-900 leading-tight truncate">{p.nombre}</p>
                <p className="text-base sm:text-xl font-bold text-slate-900 leading-tight truncate">{p.apellidos}</p>
                <div className="badge mt-1.5 sm:mt-2 text-xs">
                  <Briefcase size={10} className="sm:hidden shrink-0" />
                  <Briefcase size={12} className="hidden sm:block shrink-0" />
                  <span className="truncate">{p.ocupacion}</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 sm:space-y-2 pt-2 border-t border-slate-200">
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-700">
                <Mail size={12} className="sm:hidden text-slate-500 shrink-0" />
                <Mail size={14} className="hidden sm:block text-slate-500 shrink-0" />
                <span className="truncate">{p.email}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-700">
                <Twitter size={12} className="sm:hidden text-slate-500 shrink-0" />
                <Twitter size={14} className="hidden sm:block text-slate-500 shrink-0" />
                <span className="truncate">{p.twitter}</span>
              </div>
            </div>

            {/* Info del evento */}
            <div className="bg-slate-50 rounded-lg p-2.5 sm:p-3 space-y-1.5 sm:space-y-2 mt-3 sm:mt-4">
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-slate-600">
                <Calendar size={10} className="sm:hidden shrink-0" />
                <Calendar size={12} className="hidden sm:block shrink-0" />
                <span>Noviembre 2025</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-slate-600">
                <MapPin size={10} className="sm:hidden shrink-0" />
                <MapPin size={12} className="hidden sm:block shrink-0" />
                <span>León, Guanajuato</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-slate-800 px-4 sm:px-6 py-2 sm:py-3">
            <p className="text-xs text-slate-400 text-center">www.utleon.edu.mx</p>
          </div>
        </article>

        {/* Dorso */}
        <article className="card overflow-hidden">
          {/* Header */}
          <div className="bg-slate-100 p-4 sm:p-6 border-b border-slate-200">
            <div className="flex items-center gap-1.5 sm:gap-2 text-slate-700">
              <QrCode size={16} className="sm:hidden" />
              <QrCode size={20} className="hidden sm:block" />
              <span className="text-sm sm:text-base font-semibold">Código de Acceso</span>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* QR Code */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="h-36 w-36 sm:h-48 sm:w-48 rounded-xl border-2 sm:border-4 border-slate-200 bg-white p-3 sm:p-4 grid place-items-center">
                  <QrCode size={90} className="sm:hidden text-slate-700" />
                  <QrCode size={120} className="hidden sm:block text-slate-700" />
                </div>
                <div className="absolute -bottom-2.5 sm:-bottom-3 left-1/2 -translate-x-1/2 bg-slate-700 text-white px-3 sm:px-4 py-0.5 sm:py-1 rounded-full text-xs font-medium">
                  ID: {String(p.id).slice(0, 8)}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-5 sm:mt-6 text-center">
                Escanea para verificar registro
              </p>
            </div>

            {/* Información del congreso */}
            <div className="space-y-2 sm:space-y-3 border-t border-slate-200 pt-4 sm:pt-6">
              <div className="text-center space-y-0.5 sm:space-y-1">
                <h4 className="text-sm sm:text-base font-bold text-slate-900">Congreso de Tecnologías de la</h4>
                <h4 className="text-sm sm:text-base font-bold text-slate-900">Información y Comunicación</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 sm:mt-2">Universidad Tecnológica de León</p>
              </div>

              <div className="bg-slate-50 rounded-lg p-3 sm:p-4 space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-700">
                  <Calendar size={14} className="sm:hidden text-slate-500 shrink-0" />
                  <Calendar size={16} className="hidden sm:block text-slate-500 shrink-0" />
                  <span>Noviembre 2025</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-700">
                  <MapPin size={14} className="sm:hidden text-slate-500 shrink-0" />
                  <MapPin size={16} className="hidden sm:block text-slate-500 shrink-0" />
                  <span>León, Guanajuato, México</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer del gafete */}
          <div className="bg-linear-to-br from-slate-700 to-slate-900 p-3 sm:p-4">
            <div className="text-center space-y-0.5 sm:space-y-1">
              <p className="text-white text-xs font-medium">Este gafete es personal e intransferible</p>
              <p className="text-slate-400 text-xs">www.utleon.edu.mx</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

