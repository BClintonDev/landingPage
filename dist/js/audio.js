const button = document.getElementById("play-button");
const audio = document.getElementById("myAudio");

let isPlaying = false;
let intensity = 0;

function updateAnimation(intensity) {
  const animation = document.getElementById("play-animation");
  animation.style.animationDuration = `${Math.max(0.5, intensity)}s`;
  animation.style.opacity = Math.min(1, intensity);
}

button.addEventListener("click", function(){
  console.log("clickeado")
});

function playAudio() {
  audio.play();
  if (!isPlaying) {
    isPlaying = true;
    button.innerText = "Stop";
    setInterval(() => {
      intensity = Math.random() * 2;
      updateAnimation(intensity);
    }, 1000);
  } else {
    isPlaying = false;
    button.innerText = "Play";
    intensity = 0;
    updateAnimation(intensity);
  }
};