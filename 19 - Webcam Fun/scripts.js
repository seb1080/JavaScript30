// autoreload-server -w "**/**.{html,css,js}"

// npm i 
// npm start

const takePhotoBtn = document.querySelector('#takePhoto')
const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function getVideo() {
  navigator.mediaDevices.getUserMedia({video:true, audio: false})
    .then( localMediaStream => {
      video.src = window.URL.createObjectURL(localMediaStream)
      video.play()
    }).catch( err => console.error(err, `Error wit hthe webcam`)) 
} 


function paintToCanvas() {
  const {videoWidth: w, videoHeight: h} = video // ES6 Obj Destructuring
  canvas.width = w
  canvas.height = h
  
  return setInterval( () => {
    ctx.drawImage(video, 0, 0, w, h)
    let pixels = ctx.getImageData(0,0,w,h)
    // pixels = redEffect(pixels)
    // pixels = rgbSplit(pixels)
    // pixels = greenScreen(pixels)
    ctx.putImageData(pixels, 0, 0)
  }, 16) 
  
}

function takePhoto(e) {
  snap.currentTime = 0
  snap.play()
  const link = document.createElement('a')
  link.href = canvas.toDataURL('image/jpeg')
  link.setAttribute('download', 'handsome')
  link.innerHTML = `<img src="${link.href}" alt="user" />`
  strip.insertBefore(link, strip.firstChild)
}

function redEffect(pixels) {
  for(let i=0; i<pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100 // red
    pixels.data[i + 1] = pixels.data[i + 1] - 50 // green
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5 // blue
  }
  return pixels
}

function rgbSplit(pixels) {
  for(let i=0; i<pixels.data.length; i+=4) {
    pixels.data[i - 150] = pixels.data[i + 0] // red
    pixels.data[i + 100] = pixels.data[i + 1] // green
    pixels.data[i - 50] = pixels.data[i + 2] // blue
  }
  return pixels
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }
  return pixels;
}

// AddEventListener
video.addEventListener('canplay', paintToCanvas)
takePhotoBtn.addEventListener('click', takePhoto)




getVideo()