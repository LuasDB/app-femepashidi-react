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
      'ADVANCED NOVICE':'FSKWSINGLES-ADVNOV----------------',
      'Novice':'FSKWSINGLES-ADVNOV----------------',
      'Novicios': 'FSKWSINGLES-ADVNOV----------------',
      'JUNIOR':'FSKWSINGLES-JUNIOR----------------',
      'SENIOR':'FSKWSINGLES-SENIOR----------------',
      'Junior':'FSKWSINGLES-JUNIOR----------------',
      'Senior':'FSKWSINGLES-SENIOR----------------',
  };
  
  const etiquetasVaroniles = {
      'Avanzados 2': 'FSKMSINGLES-----------------------',
      'Avanzados 1': 'FSKMSINGLES-JUNIOR----------------',
      'Novicios': 'FSKMSINGLES-ADVNOV----------------',
      'ADVANCED NOVICE':'FSKMSINGLES-ADVNOV----------------',
      'Novice':'FSKMSINGLES-ADVNOV----------------',
      'JUNIOR':'FSKMSINGLES-JUNIOR----------------',
      'SENIOR':'FSKMSINGLES-SENIOR----------------',
      'Junior':'FSKMSINGLES-JUNIOR----------------',
      'Senior':'FSKMSINGLES-SENIOR----------------',
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
      'Basicos':'FSKWSINGLES-BASCAT----------------',
      'Basicos Especial':'FSKWSINGLES-BAECAT----------------',
      'Pre-Básicos':'FSKWSINGLES-PRBCAT----------------',
      'Pre-Basicos':'FSKWSINGLES-PRBCAT----------------',
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
      'Pre-Preliminary':'FSKWSINGLES-PPYCAT----------------',
      'Pre-Preliminary Special':'FSKWSINGLES-PYSCAT----------------',
      'Preliminary':'FSKWSINGLES-PRYCAT----------------',
      'Juvenile':'FSKWSINGLES-JUVCAT----------------',
      'Intermediate':'FSKWSINGLES-INTCAT----------------',

      'Open Pre-Preliminary':'FSKWSINGLES-PPYCAT----------------',
      'Open Pre-Preliminary Special':'FSKWSINGLES-PYSCAT----------------',
      'Open Preliminary':'FSKWSINGLES-PRYCAT----------------',
      'Open Juvenile':'FSKWSINGLES-JUVCAT----------------',
      'Open Intermediate':'FSKWSINGLES-INTCAT----------------',

      'Adult Bronze':'FSKWSINGLES-BRTCAT----------------',
      'Adult Bronze Artistic':'FSKWSINGLES-BRACAT----------------',
      'Adult Silver':'FSKWSINGLES-SITCAT----------------',
      'Adult Silver Artistic':'FSKWSINGLES-SIACAT----------------',
      'Adult Gold':'FSKWSINGLES-GOTCAT----------------',
      'Adult Gold Artistic':'FSKWSINGLES-GOACAT----------------',
      'Adult Master':'FSKWSINGLES-MATCAT----------------',
      'Adult Master Artistic':'FSKWSINGLES-MAACAT----------------',
      'Adult Elite':'FSKWSINGLES-ELTCAT----------------',
      'Adult Elite Artistic':'FSKWSINGLES-ELACAT----------------',

      'Bronze':'FSKWSINGLES-BRTCAT----------------',
      'Bronze Artistic':'FSKWSINGLES-BRACAT----------------',
      'Bronze Special Artistic':'FSKWSINGLES-BEACAT----------------',
      
      'Silver':'FSKWSINGLES-SITCAT----------------',
      'Silver Artistic':'FSKWSINGLES-SIACAT----------------',
      'Gold':'FSKWSINGLES-GOTCAT----------------',
      'Gold Artistic':'FSKWSINGLES-GOACAT----------------',
      'Master':'FSKWSINGLES-MATCAT----------------',
      'Master Artistic':'FSKWSINGLES-MAACAT----------------',
      'Elite':'FSKWSINGLES-ELTCAT----------------',
      'Elite Artistic':'FSKWSINGLES-ELACAT----------------',



      'PRE-PRELIMINARY':'FSKWSINGLES-PPYCAT----------------',
      'PRE-PRELIMINARY SPECIAL':'FSKWSINGLES-PYSCAT----------------',
      'PRELIMINARY':'FSKWSINGLES-PRYCAT----------------',
      'JUVENILE':'FSKWSINGLES-JUVCAT----------------',
      'INTERMEDIATE':'FSKWSINGLES-INTCAT----------------',
     



  };
  
  const etiquetasVaronilesCat = {
    'Intermedios 2': 'FSKMSINGLES-IN2CAT----------------',
    'Intermedios 1': 'FSKMSINGLES-IN1CAT----------------',
    'Preliminar':'FSKMSINGLES-PRECAT----------------',
    'Pre-preliminar':'FSKMSINGLES-PPRCAT----------------',
    'Pre-preliminar Especial':'FSKMSINGLES-PPECAT----------------',
    'Básicos':'FSKMSINGLES-BASCAT----------------',
    'Basicos':'FSKMSINGLES-BASCAT----------------',
    'Pre-Básicos':'FSKMSINGLES-PRBCAT----------------',
    'Pre-Basicos':'FSKMSINGLES-PRBCAT----------------',
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
    'Basicos Especial':'FSKMSINGLES-BAECAT----------------',
    'Pre-Básicos Especial':'FSKMSINGLES-PRECAT----------------',
    'Pre-Preliminary':'FSKMSINGLES-PPYCAT----------------',
    'Pre-Preliminary Special':'FSKMSINGLES-PYSCAT----------------',
    'Preliminary':'FSKMSINGLES-PRYCAT----------------',
    'Juvenile':'FSKMSINGLES-JUVCAT----------------',
    'Intermediate':'FSKMSINGLES-INTCAT----------------',

    'Open Pre-Preliminary':'FSKMSINGLES-PPYCAT----------------',
    'Open Pre-Preliminary Special':'FSKMSINGLES-PYSCAT----------------',
    'Open Preliminary':'FSKMSINGLES-PRYCAT----------------',
    'Open Juvenile':'FSKMSINGLES-JUVCAT----------------',
    'Open Intermediate':'FSKMSINGLES-INTCAT----------------',

    'Adult Bronze':'FSKMSINGLES-BRTCAT----------------',
    'Adult Bronze Artistic':'FSKMSINGLES-BRACAT----------------',
    'Adult Silver':'FSKMSINGLES-SITCAT----------------',
    'Adult Silver Artistic':'FSKMSINGLES-SIACAT----------------',
    'Adult Gold':'FSKMSINGLES-GOTCAT----------------',
    'Adult Gold Artistic':'FSKMSINGLES-GOACAT----------------',
    'Adult Master':'FSKMSINGLES-MATCAT----------------',
    'Adult Master Artistic':'FSKMSINGLES-MAACAT----------------',
    'Adult Elite':'FSKMSINGLES-ELTCAT----------------',
    'Adult Elite Artistic':'FSKMSINGLES-ELACAT----------------',

    'Bronze':'FSKMSINGLES-BRTCAT----------------',
    'Bronze Artistic':'FSKMSINGLES-BRACAT----------------',
    'Bronze Special Artistic':'FSKMSINGLES-BEACAT----------------',
    'Silver':'FSKMSINGLES-SITCAT----------------',
    'Silver Artistic':'FSKMSINGLES-SIACAT----------------',
    'Gold':'FSKMSINGLES-GOTCAT----------------',
    'Gold Artistic':'FSKMSINGLES-GOACAT----------------',
    'Master':'FSKMSINGLES-MATCAT----------------',
    'Master Artistic':'FSKMSINGLES-MAACAT----------------',
    'Elite':'FSKMSINGLES-ELTCAT----------------',
    'Elite Artistic':'FSKMSINGLES-ELACAT----------------',

    'PRE-PRELIMINARY':'FSKMSINGLES-PPYCAT----------------',
    'PRE-PRELIMINARY SPECIAL':'FSKMSINGLES-PYSCAT----------------',
    'PRELIMINARY':'FSKMSINGLES-PRYCAT----------------',
    'JUVENILE':'FSKMSINGLES-JUVCAT----------------',
    'INTERMEDIATE':'FSKMSINGLES-INTCAT----------------',
    'ADVANCED NOVICE':'FSKMSINGLES-ADVNOV----------------',
    'JUNIOR':'FSKMSINGLES-JUNIOR----------------',
    'SENIOR':'FSKMSINGLES-SENIOR----------------',
    
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
      'CALSS II':'CL2',
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
      'ADULTO':'ADU',
      'A':'AAA',
      'B':'BBB',
      'C':'CCC',
      'D':'DDD',
      'Mayor':'MAY',
      'Adulto':'ADU',



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

function obtenerCategoria(fechaNacimiento, nivel, isAdult) {
  console.log('Es adulto???',isAdult)
  const fecha = new Date(fechaNacimiento);
  const cutoffDate = new Date('2025-07-01');

  const edadAlCorte = cutoffDate.getFullYear() - fecha.getFullYear() - (
    cutoffDate < new Date(cutoffDate.getFullYear(), fecha.getMonth(), fecha.getDate()) ? 1 : 0
  );

  const time = fecha.getTime();

  // Rangos normales (no adultos)
  const rangos = {
    'PRE-INFANTIL': [
      new Date('2021-07-01').getTime(),
      new Date('2025-06-30').getTime()
    ],
    'INFANTIL A': [
      new Date('2018-07-01').getTime(),
      new Date('2021-06-30').getTime()
    ],
    'INFANTIL B': [
      new Date('2015-07-01').getTime(),
      new Date('2018-06-30').getTime()
    ],
    'JUVENIL A': [
      new Date('2011-07-01').getTime(),
      new Date('2015-06-30').getTime()
    ],
    'JUVENIL B': [
      new Date('2007-07-01').getTime(),
      new Date('2011-06-30').getTime()
    ],
    'MAYOR': [
      new Date('1997-07-01').getTime(),
      new Date('2007-06-30').getTime()
    ]
  };

  // Rangos adultos según documento
  const rangosAdultos = {
    'CLASS I': [
      new Date('1987-07-01').getTime(),
      new Date('1997-06-30').getTime()
    ],
    'CLASS II': [
      new Date('1977-07-01').getTime(),
      new Date('1987-06-30').getTime()
    ],
    'CLASS III': [
      new Date('1967-07-01').getTime(),
      new Date('1977-06-30').getTime()
    ],
    'CLASS IV': [
      new Date('1957-07-01').getTime(),
      new Date('1967-06-30').getTime()
    ],
    'CLASS V': [
      0, // antes de 1957-06-30
      new Date('1957-06-30').getTime()
    ]
  };

  if (isAdult) {
    // Competidor adulto → buscar en rangos adultos
    for (const [categoria, [inicio, fin]] of Object.entries(rangosAdultos)) {
      if (time >= inicio && time <= fin) {
        return categoria;
      }
      // Clase V: nacidos antes de 30 junio 1957
      if (categoria === 'CLASS V' && time <= fin) {
        return categoria;
      }
    }
  } else {
    // Niveles ISU
    if (nivel === 'NOVICIOS') {
      if (edadAlCorte >= 10 && edadAlCorte < 16) {
        return 'NOVICIOS (ADVANCED NOVICE) ISU';
      }
    } else if (nivel === 'AVANZADOS 1') {
      if (edadAlCorte >= 13 && edadAlCorte < 19) {
        return 'AVANZADOS 1 (JUNIOR) ISU';
      }
    } else if (nivel === 'AVANZADOS 2') {
      if (edadAlCorte >= 17) {
        return 'AVANZADOS 2 (SENIOR) ISU';
      }
    } else {
      // Otras categorías juveniles
      for (const [categoria, [inicio, fin]] of Object.entries(rangos)) {
        if (time >= inicio && time <= fin) {
          return categoria;
        }
      }

      // Si nació antes del 1 de julio 1997 y no es adulto → general
      if (time < new Date('1997-07-01').getTime()) {
        return 'ADULTO';
      }
    }
  }

  return 'Sin categoría aplicable';
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
  formatoNombre,
  fechaActual,
  obtenerTimestamp,
  formatoDosDigitos,
  obtenerEtiqueta,
  generateUID,
  obtenerCategoria
}