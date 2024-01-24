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
    }
}

export default state