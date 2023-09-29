// slider
const imgWrapper = document.querySelector(".imgWrapper");
const carousel = document.querySelectorAll(".carousel > div");
const slide = document.querySelector(".sliderController > p");
const arrowsArrowLeft = document.querySelector(".arrowsArrowLeft");
const arrowsArrowRight = document.querySelector(".arrowsArrowRight");

function sliderHandler() {
  let left = 0;
  let counter = 1;
  return (dir) => {
    if (dir == "right" && left > -7600) {
      left -= 1900;
      counter++;
      imgWrapper.style.left = `${left}px`;
    } else if (dir == "left" && left < 0) {
      left += 1900;
      counter--;
      imgWrapper.style.left = `${left}px`;
    }
    slide.innerText = `0${counter} | 05`;
    carousel.forEach((el, ind) =>
      ind === counter - 1
        ? (el.style.backgroundColor = "#D2B183")
        : (el.style.backgroundColor = "white")
    );
  };
}

const slider = sliderHandler();

arrowsArrowRight.addEventListener("click", function () {
  slider("right");
});

arrowsArrowLeft.addEventListener("click", function () {
  slider("left");
});

//

const divisor = document.getElementById("divisor");
const handle = document.getElementById("handle");
const inpRange = document.getElementById("inpRange");

function moveDivisor() {
  handle.style.left = inpRange.value + "%";
  divisor.style.width = inpRange.value + "%";
}

window.onload = function () {
  moveDivisor();
};

// player

const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const controls = player.querySelector(".player__controls");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggleButton = player.querySelector(".togglePlayback");
const volume = player.querySelector(".playerVolume");
const fullscreen = player.querySelector(".toggleFullscreen");
const icon = toggleButton.querySelector(".player__playbackIcon");
const mute = document.querySelector(".mute");
const playBtn = document.querySelector(".playBtn");
/* Functions */
function togglePlay() {
  video.paused ? video.play() : video.pause();
  if (icon.src.includes("pause")) {
    icon.src = "/assets/img/videoIcons/play.png";
    playBtn.style.opacity = "1";
  } else {
    icon.src = "./assets/img/videoIcons/pause.png";
    playBtn.style.opacity = "0";
  }
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
  if (progressBar.style.flexBasis == "100%") {
    icon.src = "./assets/img/videoIcons/play.png";
  }
}

function handleSeek(e) {
  const seekTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = seekTime;
}

// Create fullscreen video button
function toggleFullscreen() {
  if (!document.webkitFullscreenElement) {
    if (video.requestFullScreen) {
      player.requestFullScreen();
      fullscreen.src = "./assets/img/videoIcons/fullscreen_exit.png";
    } else if (video.webkitRequestFullScreen) {
      player.webkitRequestFullScreen();
      fullscreen.src = "./assets/img/videoIcons/fullscreen_exit.png";
    } else if (video.mozRequestFullScreen) {
      player.mozRequestFullScreen();
      fullscreen.src = "./assets/img/videoIcons/fullscreen_exit.png";
    }
  } else {
    document.webkitExitFullscreen();
    fullscreen.src = "./assets/img/videoIcons/fullscreen.png";
  }
}

var countrolsHideTimeout;
function toggleControls() {
  console.log("here");
  if (!video.paused) {
    clearTimeout(countrolsHideTimeout);
    controls.classList.add("player__controls--visible");
    countrolsHideTimeout = setTimeout(() => {
      controls.classList.remove("player__controls--visible");
    }, 3000);
  }
}

/* Hook up the event listeners */

video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", handleProgress);

toggleButton.addEventListener("click", togglePlay);
volume.addEventListener("change", handleRangeUpdate);
volume.addEventListener("mousemove", handleRangeUpdate);

let mousedown = false;
progress.addEventListener("click", handleSeek);
progress.addEventListener("mousemove", (e) => mousedown && handleSeek(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

fullscreen.addEventListener("click", toggleFullscreen);
video.addEventListener("dblclick", toggleFullscreen);

video.addEventListener("mousemove", toggleControls);
controls.addEventListener("mouseover", () => {
  clearTimeout(countrolsHideTimeout);
});

mute.addEventListener("click", function () {
  if (video.volume == 0) {
    video.volume = volume.value;
    mute.src = "./assets/img/videoIcons/volume.png";
  } else {
    video.volume = 0;
    mute.src = "./assets/img/videoIcons/mute.png";
  }
});

playBtn.addEventListener("click", togglePlay);

// input

document.getElementById("myinput").oninput = function () {
  const value = ((this.value - this.min) / (this.max - this.min)) * 100;
  this.style.background =
    "linear-gradient(to right, #710707 0%, #710707 " +
    value +
    "%, #fff " +
    value +
    "%, white 100%)";
};

// swap video

const videoSliderWrapper = document.querySelector(".videoSliderWrapper");
const videoSlides = document.querySelectorAll(".videoSliderWrapper > div");

videoSlides.forEach((el) =>
  el.addEventListener("click", function () {
    video.src = this.dataset.src;
    video.poster = this.dataset.url;
    icon.src = "/assets/img/videoIcons/play.png";
    progressBar.style.flexBasis = 0;
    playBtn.style.opacity = "1";
  })
);

const videoSliderControllerLeft = document.querySelector(
  ".videoSliderControllerLeft"
);
const videoSliderControllerRight = document.querySelector(
  ".videoSliderControllerRight"
);
const videoSliderCarousel = document.querySelectorAll(
  ".videoSliderControllerWrapper > div"
);

function videoSlider() {
  let out = 0;
  return (dir) => {
    if (dir == "right" && out == 0) {
      out++;
      videoSliderWrapper.style.marginLeft = "-540px";
      videoSliderCarousel[0].style.backgroundColor = "#999999";
      videoSliderCarousel[
        videoSliderCarousel.length - 1
      ].style.backgroundColor = "#333333";
    } else if (dir == "left" && out == 1) {
      out--;
      videoSliderWrapper.style.marginLeft = "5px";
      videoSliderCarousel[0].style.backgroundColor = "#333333";
      videoSliderCarousel[videoSliderCarousel.length - 1].style.backgroundColor = "#999999";
    }
  };
}

const myVideoSlider = videoSlider();

videoSliderControllerLeft.addEventListener("click", function () {
  myVideoSlider("left");
});

videoSliderControllerRight.addEventListener("click", function () {
  myVideoSlider("right");
});
