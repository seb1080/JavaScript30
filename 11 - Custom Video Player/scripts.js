// autoreload-server -w "**/**.{html,css,js}" 

// Get the html Elements
const style = document.documentElement.style

const player = document.querySelector('.player')
const video  = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')

// Functions 
function togglePlay() {
  return video[video.paused ? 'play' : 'pause']()
}
function updateButton() {
  toggle.textContent = this.paused ? '►' : '❚ ❚'
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip)  
}

function handleRange() {
    video[this.name] = this.value
}

function handleProgressChange() {
  const percent = video.currentTime / video.duration * 100
  style.setProperty('--video-progress', `${percent}%`)
}

function scrub(e) {
  video.currentTime = e.offsetX / progress.offsetWidth * video.duration
}


// addEventListener
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgressChange)

toggle.addEventListener('click', togglePlay)

skipButtons.forEach(s => s.addEventListener('click', skip)) 

ranges.forEach( r => r.addEventListener('change', handleRange))
ranges.forEach( r => r.addEventListener('mousemove', handleRange))

let mouseDown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', e => mouseDown && scrub(e))
progress.addEventListener('mousedown', scrub)
progress.addEventListener('mouseup', scrub)