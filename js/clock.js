import state from "./state.js"

const clock = {
    toggleTimer(minutes, seconds){
        if(state.isRunning){
            this.pause()
            return
        }
        this.start(minutes, seconds)
    },

    start(minutes, seconds){
        state.isRunning = true
        state.countDownId = setInterval(() => {
            if(isOver()){
                this.pause()
                state.time.minutes = minutes
                state.time.seconds = seconds
                this.updateTimer()
                return
            }
            countDown()
            this.updateTimer()
            
        },100)
    },
    pause(){
        clearInterval(state.countDownId)
        state.isRunning = false
    },
    updateTimer(){
        const minutesSpan = document.querySelector('.minutes span')
        const secondsSpan = document.querySelector('.seconds span')
        minutesSpan.textContent = String(state.time.minutes).padStart(2, "0")
        secondsSpan.textContent = String(state.time.seconds).padStart(2, "0")
    }
}

function isOver () {
    return  state.time.minutes  == 0 && state.time.seconds < 1
}

function countDown(){
    if(state.time.minutes  > 0 && state.time.seconds <= 1){
        state.time.minutes--
        state.time.seconds = 59
    } else {
        state.time.seconds--
    }
}

export default clock