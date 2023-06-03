/* $(function(){
  var session = sessionStorage.getItem("session");
  if(session == "access"){
    loadSection("views/pages.html", "#main");
  }

   // AOS
   AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    offset: 120,
    delay: 0,
    once: false,
    mirror: false
  });

  $("#btnAccess").on("click", access);
  $("#btnLogout").on("click", logout);
  
  
  function access(){
    var fecha = $("#date").val();
    console.log("fecha", fecha);
    if(fecha == "2023-05-01"){
      $(".loading-bar").addClass("show");
      
      setTimeout(() => {
        $(".loading-bar").removeClass("show");
        loadSection("views/pages.html", "#main");
        sessionStorage.setItem("session", "access");
        saInfo('Success', 'Bienvenido...!');
      }, 1000);
    } else {
      saError('Error', 'La fecha no es la correcta...!');
    }
  }
  
  function logout(){
    sessionStorage.removeItem("session");
    console.log("salir");
    location.reload();
    location.href = 'index.html';
    //loadSection("views/pages.html", "#main");
  }

}); */

document.addEventListener("DOMContentLoaded", function() {
  // Código que quieres ejecutar al cargar el DOM
  const loadingBar = document.querySelector('.loading-bar');
  const dateInput = document.querySelector('#date');
  const btnAccess = document.querySelector('#btnAccess');
  //const btnLogout = document.querySelector('#btnLogout');
  
  var session = sessionStorage.getItem("session");
  if(session == "access"){
    loadSection("views/pages.html", "#main");
  }
  
  // AOS
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    offset: 120,
    delay: 0,
    once: false,
    mirror: false
  });
  
  // Eventos
  btnAccess.addEventListener('click', access);
  //btnLogout.addEventListener('click', logout);

  function access(){
    var fecha = dateInput.value;
    console.log("fecha", fecha);
    if(fecha == "2023-05-01"){
      loadingBar.classList.add("show");
      
      setTimeout(() => {
        loadingBar.classList.remove("show");
        loadSection("views/pages.html", "#main");
        sessionStorage.setItem("session", "access");
        saInfo('Success', 'Bienvenido...!');
      }, 1000);
    } else {
      saError('Error', 'La fecha no es la correcta...!');
    }
  } 
  
  
  // Enmascarar url
  /* let pathname = (window.location.pathname).split("/");
  let newUrl = window.location.protocol + "//" + window.location.host + "/" + pathname[1] + "/#";
  history.replaceState(null, '', newUrl); */
});


// Función asincronía
/**
 * Función para cerrar contenidos
 */
function logout(){
  sessionStorage.removeItem("session");
  console.log("salir");
  location.reload();
  location.href = 'index.html';
  //loadSection("views/pages.html", "#main");
}



/**
 * Función para calcular tiempo restante de una determinada fecha
 * @param {*} futureDate 
 * @returns 
 */
function countdownTimer(futureDate) {
  const targetDate = new Date(futureDate).getTime();
  const today = new Date().getTime();
  let timeDiff = getDateLocale(targetDate) - getDateLocale(today);

  let seconds = Math.floor(timeDiff / 1000) % 60;
  let minutes = Math.floor(timeDiff / (1000 * 60)) % 60;
  let hours = Math.floor(timeDiff / (1000 * 60 * 60)) % 24;
  let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));  
  let weeks = Math.floor((days / 7) % 4);
  let months = Math.floor((days / 30) % 30);
  days %= 7;
  
  // Retornamos un objeto con los valores de tiempo restante
  return {months: months, weeks: weeks, days: days, hours: hours, minutes: minutes, seconds: seconds, timeDiff: timeDiff};
}

function getDateLocale(date){
  const formattedDateTime = date.toLocaleString('es-PE', { timeZone: 'America/Lima' });
  return formattedDateTime.replace(/,/g, '');
}

/**
 * Actualizar por cada segundo que pasa
 */
if(sessionStorage.getItem("session") == "access"){
  const timer = setInterval(() => {
    // Llamamos a la función con la fecha del cumpleaños
    let json = countdownTimer('2023-12-31 23:59:00');
  
    if (json.timeDiff < 0) {
      clearInterval(timer);
      return;
    }
  
    //Actualizamos los elementos del HTML con el tiempo restante
    document.getElementById("months").textContent = json.months;
    document.getElementById("weeks").textContent = json.weeks;
    document.getElementById("days").textContent = json.days;
    document.getElementById("hours").textContent = json.hours;
    document.getElementById("minutes").textContent = json.minutes;
    document.getElementById("seconds").textContent = json.seconds;
  }, 1000);
}




function observeDOM(callback) {
  // Crea un nuevo observer con la función de callback dada
  const observer = new MutationObserver(callback);
  
  // Configuración del observer
  const config = {
    childList: true, // Observa cambios en la lista de hijos del elemento observado
    subtree: true // Observa cambios en todos los elementos descendientes del elemento observado
  };
  
  // Elemento que será observado (en este caso, todo el documento)
  const targetNode = document.documentElement;
  
  // Comenzar la observación del targetNode con la configuración dada
  observer.observe(targetNode, config);
  
  // Devolver la función para desconectar el observer
  return function disconnectObserver() {
    observer.disconnect();
  }
}

const observer = new ObserverDOM();

observer.addSelector('#PlayPause', element => {});
observer.addSelector('#Plus10', element => {});
//observer.removeSelector('#PlayPause');

observer.subscribe(data => {
  console.log('Elemento cliqueado', data.element, data.element.id);
  $("#Plus10").on("click", function(){
    console.log("goks")
  });
});


(async () => {
  // Code here
})();