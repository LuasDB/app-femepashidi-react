import  { useState } from 'react';

const Paso3_FotoContacto = ({ nextStep, prevStep, handleChange, handleFileChange, values }) => {
  const [preview, setPreview] = useState(values.foto ? URL.createObjectURL(values.foto) : null);

  const onFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      handleFileChange(e);
    }
  };

  const continueStep = e => {
    e.preventDefault();
    nextStep();
  };
  
  const backStep = e => {
    e.preventDefault();
    prevStep();
  };

  return (
    <form onSubmit={continueStep}>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Paso 3: Foto y Contacto</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="foto">
                Fotografía (tipo credencial)
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="foto"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                required={!values.foto}
            />
            {preview && (
                <div className="mt-4 flex justify-center">
                    <img src={preview} alt="Vista previa" className="w-32 h-32 object-cover rounded-full shadow-lg"/>
                </div>
            )}
        </div>
        <div className="flex flex-col">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                    Teléfono
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="telefono"
                    type="tel"
                    placeholder="Teléfono de contacto"
                    onChange={handleChange('telefono')}
                    defaultValue={values.telefono}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="correo">
                    Correo Electrónico
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="correo"
                    type="email"
                    placeholder="Correo electrónico"
                    onChange={handleChange('correo')}
                    defaultValue={values.correo}
                    required
                />
            </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-6">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-auto"
          onClick={backStep}
        >
          Anterior
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-auto"
          type="submit"
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};

export default Paso3_FotoContacto;