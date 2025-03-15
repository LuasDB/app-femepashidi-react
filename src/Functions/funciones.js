const ordenarPorNombre = (array) => {
    return array.sort((a, b) => {
        if (a.nombre < b.nombre) {
            return -1;
        }
        if (a.nombre > b.nombre) {
            return 1;
        }
        return 0;
    });
};

function formatoFecha(fechaToEdit) {
  let fechaFormateada=''
    if(fechaToEdit.length > 10){
      const fecha = new Date(fechaToEdit)
      let year1 = fecha.getFullYear();
      let month1 = String(fecha.getMonth() + 1).padStart(2, '0'); 
      let day1 = String(fecha.getDate()).padStart(2, '0');
  
      fechaFormateada = `${year1}-${month1}-${day1}`;
    }else{
      fechaFormateada = fechaToEdit;
    }
    

    const [year, month, day] = fechaFormateada.split('-');
    const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const mes = meses[parseInt(month) - 1];
    
    return `${day}-${mes}-${year}`;
  }
 


function formatoNumeroMX(numero) {
  return Number(numero).toLocaleString('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});
}

function formatoFolios(numero, digitos) {
  // Convertir el número a cadena
  let numStr = numero.toString();
  
  // Rellenar con ceros a la izquierda hasta alcanzar la longitud deseada
  while (numStr.length < digitos) {
    numStr = '0' + numStr;
  }

  return numStr;
}

function generateUID() {
  const timestamp = Date.now().toString(36); // Convertir la marca de tiempo a base 36
  const randomNumber = Math.random().toString(36).substring(2, 15); // Generar un número aleatorio y convertirlo a base 36
  const uid = (timestamp + randomNumber).substring(0, 20); // Combinar ambos y truncar a 20 caracteres
  return uid;
}
  

  function formatoFechaHora(fechaToEdit){
  
  const fechaHora = fechaToEdit.toString().split('T');

  return `${formatoFecha(fechaToEdit)} a las ${fechaHora[1]} HRS`
}


function sumaArray(array,item){

  return array.reduce((sum,current)=>{
    return sum + parseFloat(current[item])
  },0)
}

function generarListaYears(initYear){

  let year = []
  let currentYear = new Date().getFullYear()
  for (let index = initYear; index <= currentYear; index++) {
    year.push(index)
    
  }

  return year
  
}

function ordenarPorItem(array,item){
  return array.sort((a, b) => {
      if (a[item] < b[item]) {
          return -1;
      }
      if (a[item] > b[item]) {
          return 1;
      }
      return 0;
  });
}
function fechaHoraActual(){
  const fecha = new Date();
  const anio = fecha.getFullYear();
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Mes empieza desde 0
  const dia = fecha.getDate().toString().padStart(2, '0');
  const horas = fecha.getHours().toString().padStart(2, '0');
  const minutos = fecha.getMinutes().toString().padStart(2, '0');
  
  return `${anio}-${mes}-${dia}T${horas}:${minutos}`;
 
  
}

function formatoNombre(nombre) {
  // Convierte todo el nombre a minúsculas y luego lo divide por espacios
  return nombre
    .toLowerCase()
    .split(' ') // Divide el nombre en palabras
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza la primera letra de cada palabra
    .join(' '); // Une las palabras nuevamente en una cadena
}

function fechaActual() {
  const fecha = new Date();
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Meses empiezan en 0
  const day = String(fecha.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function obtenerTimestamp() {
  const ahora = new Date();
  
  const horas = String(ahora.getHours()).padStart(2, '0');
  const minutos = String(ahora.getMinutes()).padStart(2, '0');
  const segundos = String(ahora.getSeconds()).padStart(2, '0');
  const milisegundos = String(ahora.getMilliseconds()).padStart(3, '0');

  return `${horas}${minutos}${segundos}${milisegundos}`;
}

function formatoDosDigitos(numero) {
  return String(numero).padStart(2, '0');
}

function obtenerEtiqueta(nivel, genero, categoria = "") {
  
  

  // Etiquetas de niveles sin categoría
  const etiquetasFemeniles = {
      'Avanzados 2': 'FSKWSINGLES-----------------------',
      'Avanzados 1': 'FSKWSINGLES-JUNIOR----------------',
      'Novicios': 'FSKWSINGLES-ADVNOV----------------'
  };
  
  const etiquetasVaroniles = {
      'Avanzados 2': 'FSKMSINGLES-----------------------',
      'Avanzados 1': 'FSKMSINGLES-JUNIOR----------------',
      'Novicios': 'FSKMSINGLES-ADVNOV----------------'
  };

  // Etiquetas de niveles con categoría
  const etiquetasFemenilesCat = {
      'Intermedios 2': 'FSKWSINGLES-IN2CAT----------------',
      'Intermedios 1': 'FSKWSINGLES-IN1CAT----------------',
      'Preliminar':'FSKWSINGLES-PRECAT----------------',
      'Pre-preliminar':'FSKWSINGLES-PPRCAT----------------',
      'Pre-preliminar Especial':'FSKWSINGLES-PPECAT----------------',
      'Básicos':'FSKWSINGLES-BASCAT----------------',
      'Básicos Especial':'FSKWSINGLES-BAECAT----------------',
      'Pre-Básicos':'FSKWSINGLES-PRBCAT----------------',
      'PRE BÁSICOS':'FSKWSINGLES-PRBCAT----------------',
      'Pre-Básicos Especial':'FSKWSINGLES-PRECAT----------------',
      'Debutantes 2':'FSKWSINGLES-DE2CAT----------------',
      'Debutantes 2 Especial':'FSKWSINGLES-D2ECAT----------------',
      'Debutantes 1':'FSKWSINGLES-DE1CAT----------------',
      'Adulto Bronce':'FSKWSINGLES-BRTCAT----------------',
      'Adulto Plata':'FSKWSINGLES-SITCAT----------------',
      'Adulto Oro':'FSKWSINGLES-GOTCAT----------------',
      'Adulto Master':'FSKWSINGLES-MATCAT----------------',
      'Adulto Elite':'FSKWSINGLES-ELTCAT----------------',
      'Adulto Bronce Artistico':'FSKWSINGLES-BRACAT----------------',
      'Adulto Bronce Especial Artistico':'FSKWSINGLES-BRECAT----------------',
      'Adulto Plata Artistico':'FSKWSINGLES-SIACAT----------------',
      'Adulto Oro Artistico':'FSKWSINGLES-GOACAT----------------',
      'Adulto Master Artistico':'FSKWSINGLES-MAACAT----------------',
      'Adulto Elite Artistico':'FSKWSINGLES-ELACAT----------------',
  };
  
  const etiquetasVaronilesCat = {
    'Intermedios 2': 'FSKMSINGLES-IN2CAT----------------',
    'Intermedios 1': 'FSKMSINGLES-IN1CAT----------------',
    'Preliminar':'FSKMSINGLES-PRECAT----------------',
    'Pre-preliminar':'FSKMSINGLES-PPRCAT----------------',
    'Pre-preliminar Especial':'FSKMSINGLES-PPECAT----------------',
    'Básicos':'FSKMSINGLES-BASCAT----------------',
    'Pre-Básicos':'FSKMSINGLES-PRBCAT----------------',
    'PRE BÁSICOS':'FSKMSINGLES-PRBCAT----------------',
    'Debutantes 2':'FSKMSINGLES-DE2CAT----------------',
    'Debutantes 2 Especial':'FSKMSINGLES-D2ECAT----------------',
    'Debutantes 1':'FSKMSINGLES-DE1CAT----------------',
    'Adulto Bronce':'FSKMSINGLES-BRTCAT----------------',
    'Adulto Plata':'FSKMSINGLES-SITCAT----------------',
    'Adulto Oro':'FSKMSINGLES-GOTCAT----------------',
    'Adulto Master':'FSKMSINGLES-MATCAT----------------',
    'Adulto Elite':'FSKMSINGLES-ELTCAT----------------',
    'Adulto Bronce Artistico':'FSKMSINGLES-BRACAT----------------',
    'Adulto Bronce Especial Artistico':'FSKMSINGLES-BRECAT----------------',
    'Adulto Plata Artistico':'FSKMSINGLES-SIACAT----------------',
    'Adulto Oro Artistico':'FSKMSINGLES-GOACAT----------------',
    'Adulto Master Artistico':'FSKMSINGLES-MAACAT----------------',
    'Adulto Elite Artistico':'FSKMSINGLES-ELACAT----------------',
    'Básicos Especial':'FSKMSINGLES-BAECAT----------------',
    'Pre-Básicos Especial':'FSKMSINGLES-PRECAT----------------',
    

};

  // Mapeo de categoría a Id_Categoría
  const categorias = {
      'PRE-INFANTIL A': 'PIA',
      'PRE-INFANTIL B': 'PIB',
      'INFANTIL A': 'INA',
      'INFANTIL B': 'INB',
      'INFANTIL C': 'INC',
      'JUVENIL A': 'JUA',
      'JUVENIL B': 'JUB',
      'JUVENIL C': 'JUC',
      'MAYOR': 'MAY',
      'CLASS I':'CL1',
      'CLASS II':'CL2',
      'CLASS III':'CL3',
      'CLASS IV':'CL4',
      'CLASE I':'CL1',
      'CLASE II':'CL2',
      'CLASE III':'CL3',
      'CLASE IV':'CL4',
      'Clase I':'CL1',
      'Clase II':'CL2',
      'Clase III':'CL3',
      'Clase IV':'CL4',
      'ADULTO':'ADU'
  };

  // Verificar si el nivel requiere categoría
  let etiqueta = '';

  if (genero.toLowerCase() === 'femenino') {
      etiqueta = etiquetasFemeniles[nivel] || etiquetasFemenilesCat[nivel];
  } else {
      etiqueta = etiquetasVaroniles[nivel] || etiquetasVaronilesCat[nivel];
  }

  // Si la etiqueta requiere categoría, reemplazar "CAT" por el Id_Categoría
  if (etiqueta && categoria) {
      const idCategoria = categorias[categoria];
      etiqueta = etiqueta.replace('CAT', idCategoria);
  }

  return etiqueta || 'Nivel o género no válido';
}

export { 
  ordenarPorNombre,
  formatoFecha,
  formatoNumeroMX,
  formatoFolios,
  formatoFechaHora,
  sumaArray,
  generarListaYears,
  ordenarPorItem,
  fechaHoraActual,
  formatoNombre,fechaActual,obtenerTimestamp,formatoDosDigitos,obtenerEtiqueta,generateUID
 }