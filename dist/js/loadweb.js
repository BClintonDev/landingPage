function getParam(param){
  var result = window.location.search.match(new RegExp("(\\?|&)" + param + "(\\[\\])?=([^&]*)"));
  //console.log(result);
  return result ? result[3] : false
}


function getParamPro(param) {
  // Recupera el parámetro de consulta de la URL
  var result = window.location.search.match(new RegExp("(\\?|&)" + param + "(\\[\\])?=([^&]*)"));
  var value = result ? result[3] : false;
  
  // Oculta la URL utilizando la función history.replaceState()
  let pathname = (window.location.pathname).split("/");
  var newUrl = window.location.protocol + "//" + window.location.host + "/" + pathname[1] + "/#";
  history.replaceState(null, '', newUrl);

  if(value !== false){
    sessionStorage.setItem('lastVisitedURL', value);
  }
  
  return value;
}


function load(url, callback) {
  // Creamos un objeto XMLHttpRequest
  const xhr = new XMLHttpRequest();
  // Definimos la función a llamar cuando el estado del objeto cambie
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Llamamos al callback pasándole la respuesta como parámetro
      callback(xhr.responseText);
    }
  };
  // Hacemos una petición GET al servidor
  xhr.open('GET', url, true);
  xhr.send();
}


function loadSection(url, containerSelector = "#content-data", callback = () => {}) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const container = document.querySelector(containerSelector);
      container.innerHTML = xhr.responseText;
      callback(xhr.responseText);
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
}


/* load('contenido.html', '#container', function() {
  const links = document.querySelectorAll('a');
  links.forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      load(link.href, '#container', function() {
        console.log('Contenido cargado.');
      });
    });
  });
});
 */