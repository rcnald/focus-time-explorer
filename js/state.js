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
    },
    toggleMusicPath({path, isChecked}){
        if(isChecked){
            this.activeMusics.push({path, audio: null})
        }
        this.toggleMusic(path)
    },
    toggleMusic(path){
        const music = this.activeMusics.find(obj => {
            return obj.path === path
        })
        
        if(music.audio){
            music.audio.pause()
            const pathIndex = this.activeMusics.indexOf(music)
            this.activeMusics.splice(pathIndex, 1)
        } else{
            music.audio = new Audio(music.path)
            music.audio.play()
        }
    },
}

export default state