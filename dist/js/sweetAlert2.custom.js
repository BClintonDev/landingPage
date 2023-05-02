/* 
* =========================================================
* SWEET ALERT 2
* =========================================================
* */

// Configuración del sweetAlert de avisos
function sweetAlertConfig($dataconfig){
  Swal.fire({
    icon: $dataconfig.icon,
    title: $dataconfig.title,
    position: 'top-end',
    text: $dataconfig.message,
    timer: $dataconfig.timer,
    timerProgressBar: true,
    confirmButtonColor: '#5D6D7E',
    showConfirmButton: false,
    toast: true,
    showClass: {
      popup: 'animate__animated animate__bounceInRight'
    },
    hideClass: {
      popup: 'animate__animated animate__backOutRight'
    }
  });
}

function saInfo(title, message = "", timer = 2300){
  sweetAlertConfig({
    icon    : 'info',
    title   : title,
    message : message,
    timer   : timer
  });
}

function saError(title, message = "", timer = 2300){
  sweetAlertConfig({
    icon    : 'error',
    title   : title,
    message : message,
    timer   : timer
  });
}

function saWarning(title, message = "", timer = 2300){
  sweetAlertConfig({
    icon    : 'warning',
    title   : title,
    message : message,
    timer   : timer
  });
}

function saSuccess(title, message = "", timer = 2000){
  sweetAlertConfig({
    icon    : 'success',
    title   : title,
    message : message,
    timer   : timer
  });
}

// Configuración del sweetAlert de pregunta
function confirmQuestionConfig($dataconfig){
  return Swal.fire({
    title: $dataconfig.question,
    text: $dataconfig.message,
    position: 'center',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: $dataconfig.confirmColor,
    confirmButtonText: '<i class="fas fa-check"></i> Aceptar',
    cancelButtonText: '<i class="fas fa-times"></i> Cancelar',
    buttonsStyling: true,
    reverseButtons: true,
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  });
}

function saConfirmSave(question = "¿Está seguro de guardar los datos?", text = ""){
  return confirmQuestionConfig({
    question    : question,
    message     : text,
    confirmColor: '#2471A3'
  });
}

function saConfirmDelete(question = "¿Está seguro de eliminar el registro?", text = ""){
  return confirmQuestionConfig({
    question    : question,
    message     : text,
    confirmColor: '#C0392B'
  });
}