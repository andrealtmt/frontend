import { useState } from "react";
import { User, Mail, Twitter, Briefcase, Image, Save, X, Upload } from "lucide-react";
import { apiUrl } from "../api/api";

export const Registro = () => {
  const [acepto, setAcepto] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!acepto) return alert("Debes aceptar términos y condiciones");

    setLoading(true);
    const fd = new FormData(e.currentTarget);

    fd.set("aceptoTerminos", "true");

    try {
      const res = await fetch(apiUrl("/api/registro"), { method: "POST", body: fd });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      window.location.href = "/participantes";
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Registro de Participante</h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">Completa el formulario para registrar un nuevo asistente al congreso</p>
      </div>
      <form onSubmit={onSubmit} className="card space-y-4 sm:space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="label text-xs sm:text-sm">
                <User size={12} className="sm:hidden inline mr-1" />
                <User size={14} className="hidden sm:inline mr-1" />
                Nombre
              </label>
              <input name="nombre" className="input text-sm sm:text-base" required />
            </div>
            <div>
              <label className="label text-xs sm:text-sm">
                <User size={12} className="sm:hidden inline mr-1" />
                <User size={14} className="hidden sm:inline mr-1" />
                Apellidos
              </label>
              <input name="apellidos" className="input text-sm sm:text-base" required />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="label text-xs sm:text-sm">
                <Mail size={12} className="sm:hidden inline mr-1" />
                <Mail size={14} className="hidden sm:inline mr-1" />
                Email
              </label>
              <input name="email" type="email" className="input text-sm sm:text-base" required />
            </div>
            <div>
              <label className="label text-xs sm:text-sm">
                <Twitter size={12} className="sm:hidden inline mr-1" />
                <Twitter size={14} className="hidden sm:inline mr-1" />
                Twitter
              </label>
              <input name="twitter" placeholder="@usuario" className="input text-sm sm:text-base" required />
            </div>
          </div>

          <div>
            <label className="label text-xs sm:text-sm">
              <Briefcase size={12} className="sm:hidden inline mr-1" />
              <Briefcase size={14} className="hidden sm:inline mr-1" />
              Ocupación
            </label>
            <input name="ocupacion" className="input text-sm sm:text-base" required />
          </div>

          <div>
            <label className="label text-xs sm:text-sm">
              <Image size={12} className="sm:hidden inline mr-1" />
              <Image size={14} className="hidden sm:inline mr-1" />
              Foto de Perfil
            </label>
            <div className="relative">
              <input 
                type="file" 
                name="avatar" 
                accept="image/*" 
                onChange={handleImageChange}
                className="hidden" 
                id="avatar-input"
                required 
              />
              <label 
                htmlFor="avatar-input" 
                className="input flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-50 transition-colors text-sm sm:text-base"
              >
                <Upload size={14} className="sm:hidden text-slate-500 shrink-0" />
                <Upload size={16} className="hidden sm:block text-slate-500 shrink-0" />
                <span className="text-slate-600 truncate">
                  {fileName || "Seleccionar imagen"}
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Preview de la imagen */}
        {preview && (
          <div className="flex justify-center">
            <div className="space-y-2">
              <p className="text-xs sm:text-sm text-slate-600 text-center">Vista previa:</p>
              <img 
                src={preview} 
                alt="Preview" 
                className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg border-2 border-slate-300"
              />
            </div>
          </div>
        )}

        <p className="help flex items-start gap-1 text-xs sm:text-sm">
          <Image size={12} className="mt-0.5 shrink-0" />
          La imagen debe ser preferiblemente cuadrada para verse mejor en el gafete.
        </p>

        <label className="flex items-center gap-2 text-xs sm:text-sm cursor-pointer">
          <input 
            type="checkbox" 
            name="aceptoTerminos" 
            checked={acepto} 
            onChange={(e)=>setAcepto(e.target.checked)} 
            className="w-4 h-4" 
          />
          Acepto términos y condiciones
        </label>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
          <button className="btn order-2 sm:order-1" type="button" onClick={()=>history.back()}>
            <X size={14} className="sm:hidden" />
            <X size={16} className="hidden sm:inline" />
            Cancelar
          </button>
          <button className="btn btn-primary flex-1 order-1 sm:order-2" type="submit" disabled={loading}>
            <Save size={14} className="sm:hidden" />
            <Save size={16} className="hidden sm:inline" />
            {loading ? "Guardando…" : "Guardar Participante"}
          </button>
        </div>
      </form>
    </section>
  );
};
