import state from "./state.js"

const clock = {
    maxMinutes : 60,
    maxSeconds : 59,
    toggleTimer({minutes = state.time.minutes, seconds = state.time.seconds}){
        state.isRunning ? this.pause() : this.start(minutes, seconds)
        state.toggleStateIsRunning()
        this.updateDOMToggle()
    },
    start(minutes, seconds){
        state.countDownId = setInterval(() => {
            if(state.isTimerOver()){
                state.resetStateTime({minutes, seconds})
                state.toggleStateIsRunning()
                this.pause()
                this.updateDOMToggle()
            } else {
                state.countDown()
            }
            this.updateDOMTime()
        },1000)
    },
    pause(){
        clearInterval(state.countDownId)
    },
    forward({minutes}){
        const finalMinutes = minutes + state.time.minutes

        if(finalMinutes > this.maxMinutes){
            state.time.minutes = (state.time.seconds !== 0) ? (
                this.maxMinutes - 1 
            ) : (
                this.maxMinutes
            )
        } else {
            state.time.minutes += minutes
        }
        this.updateDOMTime()
    },
    backward({minutes}){
        state.time.minutes - minutes < 0 ? (
            state.time.minutes = 0
        ) : (
            state.time.minutes -= minutes
        )
        this.updateDOMTime()
    },
    updateDOMTime(){
        const minutesSpan = document.querySelector('.minutes span')
        const secondsSpan = document.querySelector('.seconds span')
        minutesSpan.textContent = String(state.time.minutes).padStart(2, "0")
        secondsSpan.textContent = String(state.time.seconds).padStart(2, "0")
    },
    updateDOMToggle(){
        const toggle = document.querySelector('[data-action="toggleTimer"]')
        const icon = toggle.getElementsByTagName('box-icon')[0]
        icon.setAttribute('name', `${state.isRunning ? 'pause' : 'play'}`)
    }
}

export default clock