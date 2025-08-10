import axios from "axios";
import { useState } from "react";
import FormularioCartasPermiso from "../../Components/FormularioCartasPermiso";

export default function RegistroCURP() {
  const [curp, setCurp] = useState("");
  const [registrado, setRegistrado] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const verificarCURP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Cambia esta URL por la de tu API real
      const { data } = await axios.get(`${import.meta.env.VITE_SERVER}api/v1/skaters/${curp}`);

      if (data.success) {
        console.log("Registro encontrado:", data);
        setRegistrado(true);
        setData(data.data); 
      } else {
        setRegistrado(false);
        setError("CURP no registrada.");
      }
    } catch (err) {
      if(err.response && err.response.status === 404) {
        setRegistrado(false);
        setError("CURP no encontrada.");
      } else {
        console.error("Error al verificar CURP:", err); 
      setError("Error al conectar con el servidor.");}
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 p-4">
      <div className={`bg-white rounded-2xl shadow-2xl w-full ${registrado ? '' :'max-w-md'} p-6 text-center`}>
        {/* Vista inicial */}
        {registrado === null && (
          <>
            <h1 className="text-2xl font-bold text-purple-700 mb-4">
              📄 Solicitud de Cartas Permiso para competencias Internacionales
            </h1>
            <p className="text-gray-600 mb-6">
              Ingresa tu CURP para verificar tu inscripción
            </p>
            <form onSubmit={verificarCURP} className="space-y-4">
              <input
                type="text"
                value={curp}
                onChange={(e) => setCurp(e.target.value)}
                placeholder="Escribe tu CURP"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition font-semibold"
              >
                {loading ? "Verificando..." : "Verificar"}
              </button>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
          </>
        )}

        {/* Si está registrado */}
        {registrado === true && (
          <>
            <h1 className="text-2xl font-bold text-green-600 mb-4">
              ✅ ¡Registro encontrado!
            </h1>
            <p className="text-gray-600 mb-4">
              Completa la siguiente información para continuar con tu solicitud.
            </p>
            {/* Aquí colocas tu formulario personalizado */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">
               <FormularioCartasPermiso data={data} onClose={()=>{
                setRegistrado(null);
                setData(null);
                setCurp("");
                setError("");
                setLoading(false);
              }
               }/>
              </p>
            </div>
          </>
        )}

        {/* Si no está registrado */}
        {registrado === false && (
          <>
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              ❌ CURP no encontrada
            </h1>
            <p className="text-gray-600 mb-4">
              Por favor, verifica que hayas escrito tu CURP correctamente.
            </p>
            <button
              onClick={() => setRegistrado(null)}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Intentar de nuevo
            </button>
          </>
        )}
        {!registrado && (<div className="mt-6 text-gray-500">
       <a href='https://femepashidi.up.railway.app/registro' className="text-blue-500 hover:underline pt-8">Si aun no estas registrado en nuestra plataforma registrate aqui</a>


        </div>)}


      </div>
    
    </div>
  );
}
