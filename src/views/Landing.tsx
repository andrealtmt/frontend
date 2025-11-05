import { PenLine, Users, UsersRound, Ticket } from "lucide-react";

export const Landing = () => {
  return (
    <section className="grid place-items-center min-h-[70dvh] text-center space-y-6 sm:space-y-8 px-4">
      <div className="space-y-3 sm:space-y-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
          Congreso TICs UTL
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl px-4">
          Sistema de registro y gestión de participantes para el Congreso de TICs de la Universidad Tecnológica de León.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-center w-full sm:w-auto">
        <a href="/registro" className="btn btn-primary px-6 sm:px-8 py-3 text-sm sm:text-base justify-center">
          <PenLine size={18} />
          Registrar nuevo participante
        </a>
        <a href="/participantes" className="btn px-6 sm:px-8 py-3 text-sm sm:text-base justify-center">
          <Users size={18} />
          Ver lista de participantes
        </a>
      </div>

      <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl w-full">
        <div className="card-sm text-center space-y-2 sm:space-y-3">
          <div className="flex justify-center text-slate-600">
            <UsersRound size={36} className="sm:hidden" strokeWidth={1.5} />
            <UsersRound size={40} className="hidden sm:block" strokeWidth={1.5} />
          </div>
          <h3 className="font-semibold text-slate-800 text-sm sm:text-base">Gestión de Asistentes</h3>
          <p className="text-xs sm:text-sm text-slate-600">Registra y administra los participantes del congreso</p>
        </div>
        <div className="card-sm text-center space-y-2 sm:space-y-3">
          <div className="flex justify-center text-slate-600">
            <Ticket size={36} className="sm:hidden" strokeWidth={1.5} />
            <Ticket size={40} className="hidden sm:block" strokeWidth={1.5} />
          </div>
          <h3 className="font-semibold text-slate-800 text-sm sm:text-base">Generación de Gafetes</h3>
          <p className="text-xs sm:text-sm text-slate-600">Crea gafetes personalizados para cada asistente</p>
        </div>
      </div>
    </section>
  );
};
