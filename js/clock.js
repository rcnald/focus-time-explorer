import state from "./state.js"

const clock = {
    toggleTimer(minutes, seconds){
        state.isRunning ? this.pause() : this.start(minutes, seconds)
        state.toggleStateIsRunning()
        this.updateDOMtoggle()
    },
    start(minutes, seconds){
        state.countDownId = setInterval(() => {
            if(state.isTimerOver()){
                state.resetStateTime({minutes, seconds})
                state.toggleStateIsRunning()
                this.pause()
                this.updateDOMtoggle()
            } else {
                state.countDown()
            }
            this.updateDOMTime()
        },100)
    },
    pause(){
        clearInterval(state.countDownId)
    },
    updateDOMTime(){
        const minutesSpan = document.querySelector('.minutes span')
        const secondsSpan = document.querySelector('.seconds span')
        minutesSpan.textContent = String(state.time.minutes).padStart(2, "0")
        secondsSpan.textContent = String(state.time.seconds).padStart(2, "0")
    },
    updateDOMtoggle(){
        const toggle = document.querySelector('[data-action="toggleTimer"]')
        const icon = toggle.getElementsByTagName('box-icon')[0]
        state.isRunning ? icon.setAttribute('name', 'pause') : icon.setAttribute('name', 'play')
    }
}

export default clock