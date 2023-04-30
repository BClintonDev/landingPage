document.addEventListener("DOMContentLoaded", function() {
  // Código que quieres ejecutar al cargar el DOM
  const loadingBar = document.querySelector('.loading-bar');
  const dateInput = document.querySelector('#date');
  const btnAccess = document.querySelector('#btnAccess');
  
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
  
  function access(){
    var fecha = dateInput.value;
    console.log("fecha", fecha);
    if(fecha == "2023-05-01"){
      console.log("accedido");
      loadingBar.classList.add("show");
      
      setTimeout(() => {
        loadingBar.classList.remove("show");
        loadSection("views/pages.html", "#content-data");
      }, 1000);
    }
  }
});

