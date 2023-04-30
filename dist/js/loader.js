// JavaScript
var loader = document.querySelector(".container-loader");

// Loader start
window.onload = function(){
  loader.classList.add('show');
}

// Loading complete
document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    setTimeout(() => {
      loader.classList.remove('show');
      setTimeout(() => {loader.style.display = "none";}, 1000);
    }, 0);
  }
};

