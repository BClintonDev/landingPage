function $(selector, context) {
  context = context || document;
  var ready = false;
  var elements = [];
  var readyQueue = [];

  function onReady() {
    ready = true;
    readyQueue.forEach(function(func) {
      func();
    });
  }

  if (context.readyState === 'complete') {
    setTimeout(onReady);
  } else {
    context.addEventListener('DOMContentLoaded', onReady);
    window.addEventListener('load', onReady);
  }

  if(typeof selector === 'function'){
    if (ready) {
      selector();
    } else {
      readyQueue.push(selector);
    }
    return;
  }
  
  if (typeof selector === 'string') {
    function getElements() {
      elements = Array.from(document.querySelectorAll(selector));
    }
    getElements();
    context.addEventListener('DOMContentLoaded', getElements);
  } else if (selector instanceof Element) {
    elements = [selector];
  } else if (selector instanceof NodeList) {
    elements = Array.from(selector);
  } else if (Array.isArray(selector)) {
    elements = selector.filter(function(element) {
      return element instanceof Element;
    });
  }

  // Función para extender objetos
  $.extend = function(target) {
    if (target === undefined) {
      target = this;
    }
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (source.hasOwnProperty(key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

  // Función para agregar un evento
  elements.on = function(eventType, selector, handler) {
    if (typeof selector === 'function') {
      handler = selector;
      selector = null;
    }

    function delegatedHandler(event) {
      var target = event.target;

      while (target && target !== this) {
        if (target.matches(selector)) {
          handler.call(target, event);
        }

        target = target.parentNode;
      }
    }

    elements.forEach(function(element) {
      if (selector) {
        element.addEventListener(eventType, delegatedHandler);
      } else {
        element.addEventListener(eventType, handler);
      }
    });
  }

  //Función para disparar eventos en los elementos
  elements.trigger = function(event) {
    var evt = new Event(event);
    elements.forEach(function(element) {
      element.dispatchEvent(evt);
    });
  }

  // Función para detectar click fuera del elemento
  elements.clickOut = function(callback) {
    document.addEventListener('click', (event) => {
      let isClickInside = false;
      elements.forEach((element) => {
        if(element.contains(event.target)) {
          isClickInside = true;
        }
      });
      if(!isClickInside) {
        callback(event);
      }
    });
  }

  // Función para desencadenar otro evento
  elements.click = function() {
    (typeof elements === 'object' && elements !== null && elements.click) && elements[0].click();
  };

  // Función para validar si el elemento contiene la clase indicada
  elements.contains = function(name) {
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].classList.contains(name) || elements[i].id === name) {
        return true;
      }
    }
    return false;
  }

  //Función para asignar un valor al input u obtener su valor
  elements.val = function (value) {
    if(value === undefined){
      return elements[0].value;
    } else {
      for (var i = 0; i < elements.length; i++) {
        elements[i].value = value;
      }
    }
  }

  //Función para asignar un valor al html u obtener su contenido
  elements.html = function (content) {
    if(content === undefined){
      return elements[0].innerHTML;
    } else {
      for (var i = 0; i < elements.length; i++) {
        elements[i].innerHTML = content;
      }
    }
  }

  //Función para asignar un valor al html text u obtener su contenido
  elements.text = function (content) {
    if(content === undefined){
      return elements[0].textContent;
    } else {
      for (var i = 0; i < elements.length; i++) {
        elements[i].textContent = content;
      }
    }
  }

  //Función para asignar un valor al html u obtener su contenido desde el elemento seleccionado
  elements.outHtml = function (content) {
    if(content === undefined){
      return elements[0].outerHTML;
    } else {
      for (var i = 0; i < elements.length; i++) {
        elements[i].outerHTML = content;
      }
    }
  }
  
  //Función para asignar u obtener un valor de un atributo
  elements.attr = function (attribute, value) {
    if(elements[0] !== undefined){
      if(value === undefined && elements[0].hasAttribute(attribute)){
        return elements[0].getAttribute(attribute);
      } else {
        for (var i = 0; i < elements.length; i++) {
          elements[i].setAttribute(attribute, value);
        }
      }
    }
  }
  
  //Función para asignar u obtener un valor de una propiedad
  elements.prop = function (property, value) {
    if(elements[0] !== undefined){
      if(value === undefined && elements[0].hasOwnProperty(property)){
        return elements[0][property];
      } else {
        for (var i = 0; i < elements.length; i++) {
          elements[i][property] = value;
        }
      }
    }
  }

  //Función para asignar  u obtener un valor de un dataset
  elements.data = function(key, value) {
    if (value === undefined) {
      // leer el valor del dataset
      return elements[0].dataset[key.replace(/-([a-z])/g, function(match, letter) {
        return letter.toUpperCase();
      })];
    } else {
      // Asignar el valor del dataset
      for (var i = 0; i < elements.length; i++) {
        elements[i].dataset[key.replace(/-([a-z])/g, function(match, letter) {
          return letter.toUpperCase();
        })] = value;
      }
    }
  }
  
  //Función para remover un atributo
  elements.removeAttr = function (attribute) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute(attribute);
    }
  }

  //Función para asignar enfoque
  elements.focus = function () {
    elements[0].focus();
  }

  //Función para resetear
  elements.reset = function () {
    elements[0].reset();
  }

  //Función para Obtener datos del formulario
  elements.getSerialize = function () {
    var form = elements[0];
    var data = new FormData(form);
    var params = new URLSearchParams(data);
    var dataArray = Array.from(params.entries());
    var formData = dataArray.reduce(function(obj, item) {
        obj[item[0]] = item[1];
        return obj;
    }, {});

    return formData;
  }

  //Función para Asignar datos al formulario
  elements.setSerialize = function (data) {
    var formElements = elements[0].querySelectorAll('input, select, textarea, p, span, li');

    formElements.forEach(function (element) {
      let name = element.getAttribute('name');
      if (data[name] !==  undefined) {
        if (element.type === "checkbox" || element.type === "radio") {
          if (element.value === data[name]) {
            element.checked = true;
          }
        } else {
          // Agregar control para identificar el tipo de elemento
          switch (element.tagName.toLowerCase()) {
            case 'input':
            case 'textarea':
              element.value = data[name];
              break;
            case 'select':
              var option = element.querySelector('option[value="' + data[name] + '"]');
              if (option) {
                option.selected = true;
              }
              break;
            case 'p':
            case 'span':
            case 'li':
            case 'u':
              element.innerHTML = data[name];
              break;
            default:
              console.warn('Tipo de elemento desconocido:', element.tagName);
          }
        }
      } else {
        if (element.type === "checkbox" || element.type === "radio") {
          element.checked = false;
        } else {
          element.value = "";
        }
      }
    });
  }

  //Función para asignar una clase a una etiqueta
  elements.addClass = function (className) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.add(className);
    }
  }

  //Función para quitar una clase a una etiqueta o todas las clases si no se especifica ninguna
  elements.removeClass = function (className) {
    if(!className){
      for (var i = 0; i < elements.length; i++) {
        elements[i].className = ``;
      }
    } else {
      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove(className);
      }
    }
  }

  //Función para asignar y quitar clase
  elements.toggleClass = function (className) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.toggle(className);
    }
  }

  // Función para agregar contenido al inicio
  elements.prepend = function(content) {
    if(!elements.length > 0){
      console.error("No se ha especificado el contenedor de los elementos");
      return;
    }
  
    if (!content) {
      console.error("No se ha especificado un contenido para agregar");
      return;
    }
  
    elements.forEach(function(element) {
      element.innerHTML = content + element.innerHTML;
    });
  }

  // Función para agregar contenido al final
  elements.append = function(content) {
    if(!elements.length > 0){
      console.error("No se ha especificado el contenedor de los elementos");
      return;
    }
  
    if (!content) {
      console.error("No se ha especificado un contenido para agregar");
      return;
    }
  
    elements.forEach(function(element) {
      element.innerHTML += content;
    });
  }

  // Función para agregar contenido hijos al final
  elements.appendChild = function(content) {
    if(!elements.length > 0){
      console.error("No se ha especificado el contenedor de los elementos");
      return;
    }
  
    if (!content) {
      console.error("No se ha especificado un contenido para agregar");
      return;
    }
  
    elements.forEach(function(element) {
      element.appendChild(content);
    });
  }

  // Función para limpiar el contenido
  elements.empty = function() {
    for (let i = 0; i < elements.length; i++) {
      elements[i].innerHTML = '';
    }
  }
    
  //Función para remover contenido
  elements.remove = function () {
    for (var i = 0; i < elements.length; i++) {
      elements[i].remove();
    }
  }
 
  //Función para asignar estilos al elemento
  elements.css = function(property, value) {
    if(typeof property === 'object'){
      var props = property;
      for(var i = 0; i < elements.length; i++){
        for(var key in props){
          elements[i].style[key] = props[key];
        }
      }
    }else{
      for(var i = 0; i < elements.length; i++){
        elements[i].style[property] = value;
      }
    }
  }

  //Función para determinar eventos del 
  elements.is = function(param) {
    if (param === ":visible") {
      return elements[0].offsetWidth > 0 && elements[0].offsetHeight > 0;
    } else if (param === ":hidden") {
      return elements[0].offsetWidth === 0 || elements[0].offsetHeight === 0;
    } else if (param === ":enabled") {
      return !elements[0].disabled;
    } else if (param === ":disabled") {
      return elements[0].disabled;
    } else if (param === ":checked") {
      return elements[0].checked;
    }
  }

  // Función para seleccionar un elemento específico en la lista de elementos
  elements.eq = function(index) {
    let equal = [];
    if (index < 0 || index >= elements.length || elements == undefined || elements == null) {
      equal = [];
    } else {
      equal = elements[index];
    }

    return nova(equal);
  }
  
  // Función para buscar elementos hijos
  elements.find = function(selector) {
    var found = [];
    elements.forEach(function(element) {
      var children = Array.from(element.querySelectorAll(selector));
      found = found.concat(children);
    });

    //devolver objeto con métodos
    return nova(found);
  }

  // Función para iterar sobre cada elemento
  elements.each = function(callback) {
    elements.forEach(function(element, index) {
      callback.call(element, index, element);
    });
    return elements;
  }

  // Función para obtener el siguiente elemento hermano
  elements.next = function() {
    return nova(elements[0].nextElementSibling);
  }

  // Función para obtener el elemento hermano anterior
  elements.prev = function() {
    return nova(elements[0].previousElementSibling);
  }

  // Función para obtener el padre del elemento
  elements.parent = function() {
    return nova(elements[0].parentNode);
  }

  // Función para obtener los hijos del elemento
  elements.children = function(selector) {
    var children = [];
    if (elements.length > 0) {
      var element = elements[0];
      if (typeof selector === 'string' && selector.trim() !== '') {
        children = Array.from(element.querySelectorAll(selector));
      } else {
        children = Array.from(element.children);
      }
      children = children.filter(function(node) {
        return node.nodeType === 1;
      });
    }

    return nova(children);
  };  

  // Método para buscar el ancestro más cercano que coincida con el selector
  elements.closest = function(selector) {
    var closestAncestor = elements[0].closest(selector);
    return nova(closestAncestor);
  }

  return elements;
}