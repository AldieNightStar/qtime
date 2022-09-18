let TIME = 0;
let TIMERS = [];

let AUD = new Audio();

// BASIC setup
setInterval(() => {
    updateTimers(playSound);
    showTimers();
}, 1000)

function addTimer(time) {
    if (TIMERS.length > 32) return;
    TIMERS.push(TIME + time);
}

function playSound() {
    AUD.src = "alarm.wav";
    AUD.time = 0;
    AUD.play();
}

function showTimers() {
    let timers = document.getElementById("timers");
    timers.innerHTML = "";
    for (let i = 0; i < TIMERS.length; i++) {
        let timer = TIMERS[i];

        let el = document.createElement("p")
        let del = document.createElement("button")

        el.innerHTML = "TIMER: " + Math.abs(TIME - timer);
        del.innerHTML = "X";
        del.onclick = () => {removeTimer(timer); showTimers();}

        timers.appendChild(el);
        el.appendChild(del)
    }
}

function removeTimer(time) {
    TIMERS = TIMERS.filter(t => t != time)
}

function updateTimers(action) {
    TIME += 1;
    for (let i = 0; i < TIMERS.length; i++) {
        let timer = TIMERS[i];
        if (timer <= TIME) {
            // When one of timers are done
            action(timer);
            // Leave only timers which are bigger than current time in sec
            TIMERS = TIMERS.filter(t => t > TIME);
            break;
        }
    }
}

// Service worker (Make this timer work offline)
if('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('sw.js');
    });
}