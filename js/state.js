import clock from "./clock.js"

const state = {
    isRunning : false,
    time : {
        minutes : 1,
        seconds : 0 
    },
    activeMusics : [],
    countDownId : null,
    resetStateTime({minutes, seconds}){
        this.time.minutes = minutes
        this.time.seconds = seconds
    },
    toggleStateIsRunning(){
        this.isRunning = !this.isRunning
    },
    isTimerOver () {
        return  this.time.minutes  == 0 && this.time.seconds < 1
    },
    countDown(){
        if(this.time.minutes  > 0 && this.time.seconds <= 1){
            this.time.minutes--
            this.time.seconds = 59
        } else {
            this.time.seconds--
        }
    },
    verifyTimeIsGreater({ minutes, seconds }) {  
        if (minutes !== undefined && !seconds) {
            if (minutes > clock.maxMinutes) {
                state.time.minutes = (state.time.seconds !== 0) ? (
                    clock.maxMinutes - 1
                ) : (
                    clock.maxMinutes
                )
            } else {
                state.time.minutes = minutes;
            }
        } else if (!minutes && seconds !== undefined) {
            if (seconds > clock.maxSeconds && (
                state.time.minutes >= clock.maxMinutes
            )) {
                state.time.seconds = 0;
            } else if (seconds > clock.maxSeconds) {
                state.time.seconds = clock.maxSeconds;
            } else {
                state.time.seconds = seconds;
            }
        }
    }
}

export default state