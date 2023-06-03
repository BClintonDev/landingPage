const color = document.getElementById('color');
const btnGenerar = document.getElementById('btnGenerarColor');


function generateColorRandom(coloresPrevios = []) {
  let color = "#";
  let colorRepetido = true;
  while (colorRepetido) {
    for (let i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 16).toString(16);
    }
    if (!coloresPrevios.includes(color)) {
      colorRepetido = false;
    }
  }
  return color;
}

function generateColorRandom2(coloresPrevios = []) {
  let color = "#";
  let colorRepetido = true;
  while (colorRepetido) {
    // Generar valores de canal de color (rojo, verde, azul)
    const r = Math.floor(Math.random() * 128) + 128;
    const g = Math.floor(Math.random() * 128) + 128;
    const b = Math.floor(Math.random() * 128) + 128;
    // Construir el valor hexadecimal del color
    color += r.toString(16).padStart(2, '0');
    color += g.toString(16).padStart(2, '0');
    color += b.toString(16).padStart(2, '0');
    // Verificar si el color es válido (no está en la lista de colores previos y no es demasiado claro)
    if (color !== "#FFFFFF" && !coloresPrevios.includes(color)) {
      colorRepetido = false;
    } else {
      color = "#"; // Reiniciar el valor de color y volver a generar otro color
    }
  }
  return color;
}

function generateDistinctColor(colors = []) {
  let color = '';
  let colorExists = true;
  const minVal = 15; // valor mínimo de cada componente de color
  const maxVal = 110; // valor máximo de cada componente de color
  while (colorExists) {
    let r = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
    let g = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
    let b = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
    color = "#" + r.toString(16) + g.toString(16) + b.toString(16);
    if (!colors.includes(color)) {
      colorExists = false;
    }
  }
  return color;
}

function convertSize(sizeKB) {
  let sizeMB = sizeKB / 1024; // Convertir a MB
  let sizeGB = sizeMB / 1024; // Convertir a GB

  if (sizeGB >= 1) {
    return sizeGB.toFixed(2) + " GB";
  } else if (sizeMB >= 1) {
    return sizeMB.toFixed(2) + " MB";
  } else {
    return sizeKB + " KB";
  }
}


console.log(convertSize(1024));
console.log(convertSize(500000));
console.log(convertSize(1048576));
/* btnGenerar.addEventListener("click", function(){
  const coloresPrevios = ["#3a2c8f", "#91bf67", "#e6614f"];
  const colorAleatorio = generateDistinctColor(coloresPrevios);
  color.value = colorAleatorio;
  document.getElementById("bg").style.background  = colorAleatorio;
  console.log(colorAleatorio); // "#f19e37"
});
 */


/* DESCARGAR CUALQUIER ARCHIVO */
function downloadFile(url) {
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      let name = url.split("/").pop();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${name}`;
      link.click();
      URL.revokeObjectURL(link.href);
    });    
}


function descargarArchivo(){
  let ruta = 'https://admin-sorteos.midassolutionscenter.com/api-midas-chat/files/chat/chat_images/S01.s1 - Ejercicios - 01.pdf';
  downloadFile(ruta);
}

// Función para obtener la dirección IP local
function getLocalIP(callback) {
  // Hacer una solicitud a un servicio de detección de IP pública
  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      // Extraer la dirección IP local de la respuesta
      var ip = data.ip;

      // Ejecutar el callback con la dirección IP local
      callback(ip);
    })
    .catch(error => {
      console.error(error);
      // Ejecutar el callback con un valor nulo en caso de error
      callback(null);
    });
}

function getApiUbigeo() {
  return new Promise((resolve) => {
    ajax({
      url: 'https://raw.githubusercontent.com/jmcastagnetto/ubigeo-peru-aumentado/main/ubigeo_departamento.json',
      method: 'GET',
      success: function(res){
        resolve(res);
      }
    })
  });
}

// Llamar a la función para obtener la dirección IP local
getLocalIP(function (ip) {
  if (ip) {
    console.log('Dirección IP local:', ip);
  } else {
    console.log('No se pudo obtener la dirección IP local.');
  }
});


getApiUbigeo().then(res => {
  let departamentos = [];
  let model = {
    cod: '',
    ubigeo: '',
    bool: false,
    hora: '',
    fecha: '',
    color: '#FFFFFF',
    idPais: 0,
    nombre: '',
    horaHace: '',
    fechaHace: '',
    idTipoEstado: 0
  };

  let json = JSON.parse(res);
  json.forEach(item => {
    model.nombre = item.departamento;
    model.ubigeo = item.reniec;

    departamentos.push(model);
  });

  console.log(res, json, departamentos);
});




















const array = [1, 2, 3];

for (let i = 0; i < array.length; i++) {
  const user1 = array[i];

  for (let j = i + 1; j < array.length; j++) {
    const user2 = array[j];

    console.log(`Chat entre ${user1} y ${user2}`);
    // Aquí puedes realizar las acciones necesarias para crear el chat entre los usuarios
  }
}

array.forEach(item => {});


