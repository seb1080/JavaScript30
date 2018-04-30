// autoreload-server -w "**/**.{html,css,js}"

const timeLeft = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]')

let intervalId

//  Functions
function timer(sec) {
  clearInterval(intervalId)
  const now = Date.now()
  const then = now + sec * 1000

  displayTime(sec)
  displayEndTime(then)

  intervalId = setInterval(() => {
    const secondsLeft = (then - Date.now()) / 1000
    
    if (secondsLeft < 0) {
      clearInterval(intervalId)
      timeLeft.innerHTML = `FINISH`
    } else displayTime(secondsLeft)
  }, 1000)
}

function displayTime(seconds) {
  const min = (seconds / 60).toFixed(0)
  const secRest = seconds - (min * 60)
  const display = `${min}:${seconds.toFixed(0) < 10 ? '0':''}${seconds.toFixed(0)}`
  timeLeft.innerHTML = display
  document.title = display
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp)
  const hrs = end.getHours()
  const min = end.getMinutes()
  const display = `${hrs}:${min < 10 ? '0':''}${min}`

  endTime.textContent = display
}

function startTimer(e) {
  const seconds = parseInt(this.dataset.time)
  timer(seconds)
}

// AddEventListener
buttons.forEach(b => b.addEventListener('click', startTimer))
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault()
  const mins = this.minutes.value
  console.log(mins)
  timer(mins * 60)
  this.reset()  
})


// main
