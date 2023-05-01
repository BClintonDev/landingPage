/* $(function(){
  var session = sessionStorage.getItem("session");
  if(session == "access"){
    loadSection("views/pages.html", "#content-data");
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
        loadSection("views/pages.html", "#content-data");
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
    //loadSection("views/pages.html", "#content-data");
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
    loadSection("views/pages.html", "#content-data");
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
        loadSection("views/pages.html", "#content-data");
        sessionStorage.setItem("session", "access");
        saInfo('Success', 'Bienvenido...!');
      }, 1000);
    } else {
      saError('Error', 'La fecha no es la correcta...!');
    }
  }  
});


function logout(){
  sessionStorage.removeItem("session");
  console.log("salir");
  location.reload();
  location.href = 'index.html';
  //loadSection("views/pages.html", "#content-data");
}
